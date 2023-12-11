import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
// import { body, validationResult } from "express-validator";
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';

//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_KEY,
  api_secret:process.env.API_SECRET
});

const __dirname = dirname(fileURLToPath(import.meta.url))
// app.use(express.static(path.resolve(__dirname, './public')))
app.use(express.static(path.resolve(__dirname, './client/dist')))

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cookieParser());
app.use(express.json());

//routers
import jobRouter from "./routers/jobRouter.js";
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";


//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";

// app.get("/", (req, res) => {
//   res.send("hello word");
// });

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      'img-src': ["'self'", 'https://res.cloudinary.com'],
    },
  },
}));

app.use(mongoSanitize());
app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});
// app.post(
//   "/api/v1/test",
//   [
//     body("name").notEmpty().withMessage("name is required"),
//     (req, res, next) => {
//       const errors = validationResult(req);
//     //   console.log(errors.isEmpty());
//     if(!errors.isEmpty()){
//         const errorMessage = errors.array().map(error=>error.msg);
//         return res.status(400).json({errors: errorMessage});
//     }
//       next();
//     },
//   ],
//   (req, res) => {
//     const { name } = req.body;
//     // console.log(req);
//     res.json({ message: name });
//   }
// );

app.use("/api/v1/jobs", authenticateUser, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);

app.get('*', (req, res)=>{
  // res.sendFile(path.resolve(__dirname, './public', 'index.html'))
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'))
})

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
}); //order matters

app.use(errorHandlerMiddleware); //has to be the last one

const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running.....port: ${port}`);
  });
} catch (err) {
  console.log(err);
  process.exit(1);
}

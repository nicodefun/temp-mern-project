import { readFile } from "fs/promises"; //dont need callback
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Job from "./models/jobModel.js";
import User from "./models/userModel.js";
import { log } from "console";

try {
  await mongoose.connect(process.env.MONGO_URL);
  const testUser = await User.findOne({ email: "test@test.com" });
  const jsonJobs = JSON.parse(
    await readFile(new URL("./util/MOCK_DATA.json", import.meta.url))
  );
  const jobs = jsonJobs.map(job=>{
    return {...job, createdBy:testUser._id}
  })
  await Job.deleteMany({createdBy: testUser._id})
  await Job.create(jobs)
  console.log('populate success')
  process.exit(0);
} catch (err) {
    console.log(err);
    process.exit(1)
}

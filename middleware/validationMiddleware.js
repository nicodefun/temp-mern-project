import { body, validationResult } from "express-validator";
import { BadRequestError, NotFoundError, UnauthenticatedError } from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../util/constants.js";
import mongoose from "mongoose";
import { param } from "express-validator";
import Job from "../models/jobModel.js";
import User from "../models/userModel.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      //   console.log(errors.isEmpty());
      if (!errors.isEmpty()) {
        const errorMessage = errors.array().map((error) => error.msg);
        //   return res.status(400).json({errors: errorMessage});
        // console.log(errorMessage); //array
        if (errorMessage[0].startsWith("no job")) {
          throw new NotFoundError(errorMessage);
        }
        if(errorMessage[0].startsWith('not authorized')){
          throw new UnauthenticatedError(errorMessage);
        }
        throw new BadRequestError(errorMessage);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationErrors([
  body("company").notEmpty().withMessage("company is required"),
  body("position").notEmpty().withMessage("position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("invalid status value"),
  body("jobType").isIn(Object.values(JOB_TYPE)).withMessage("invalid job type"),
]);

export const validateIdParams = withValidationErrors([
  param("id").custom(async (value, {req}) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value); //true / false
    if (!isValidId) throw new BadRequestError("invalid MongoDB id");
    const job = await Job.findById(value);
    if (!job) throw new NotFoundError(`no job with id ${value}`);
    const isAdmin = req.user.userRole ==='admin';
    const isOwner = req.user.userId === job.createdBy.toString();
    console.log(isAdmin)
    console.log(isOwner)
    if(!isAdmin && !isOwner){
      throw new UnauthenticatedError('not authorized to access this route.')
    }
  }),
]);

export const validateRegisterInput = withValidationErrors([
  body("name").notEmpty().withMessage("name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("Email already exists...");
      }
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password must be at least characters long."),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("last name is required"),
]);

export const validateLogin = withValidationErrors([
  body("email")
    .notEmpty()
    .withMessage("Email required...")
    .isEmail()
    .withMessage("invalid email format"),
  body("password").notEmpty().withMessage("Password required"),
]);

export const validateUpdateUserInput = withValidationErrors([
  body('name').notEmpty().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('invalid email format')
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId) {
        throw new Error('email already exists');
      }
    }),
  body('lastName').notEmpty().withMessage('last name is required'),
  body('location').notEmpty().withMessage('location is required'),
]);


// export const validateTest = withValidationErrors([
//   body("name").notEmpty().withMessage("name is required"),
// ]);

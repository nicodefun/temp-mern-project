import { StatusCodes } from "http-status-codes";

import User from "../models/userModel.js";
import Job from "../models/jobModel.js";

import { v2 as cloudinary } from "cloudinary";
// import { promises as fs } from "fs";
import { formatImage } from "../middleware/multerMiddleware.js";

export const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json({ user: userWithoutPassword });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ msg: "application stats", users, jobs });
};

export const updateUser = async (req, res) => {
  // console.log(req.file);
  // path: 'public/uploads/avatar-1.jpg',
  const newUser = { ...req.body };
  delete newUser.password;
  if (req.file) {
    const file  = formatImage(req.file);
    // return
    // const response = await cloudinary.uploader.upload(req.file.path);
    const response = await cloudinary.uploader.upload(file);
    // console.log(response);
    // await fs.unlink(req.file.path);
    newUser.avatar = response.secure_url;
    newUser.avatarPublicId = response.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, newUser);
  if (req.file && updatedUser.avatarPublicId) {
    await cloudinary.uploader.destroy(updatedUser.avatarPublicId); //remove old one
  }
  res.status(StatusCodes.OK).json({ msg: "update user" });
};

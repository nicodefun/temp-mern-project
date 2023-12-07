import { StatusCodes } from "http-status-codes";
import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../util/password.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import {createJWT} from '../util/tokenutil.js'

export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     throw new UnauthenticatedError("invalid credentials");
//   }
//   const isPasswordCorrect = await comparePassword(
//     req.body.password,
//     user.password
//   );
  const isValidUser = user && (await comparePassword( req.body.password,
    user.password))
  if (!isValidUser ) throw new UnauthenticatedError("invalid credentials");

  const token = createJWT({
    userId: user._id,
    userRole: user.role
  })

  const oneDay = 1000*60*60*24 //milliseconds
  res.cookie('token', token, {
    httpOnly: true, 
    expires: new Date(Date.now()+oneDay),
    secure: process.env.NODE_ENV === 'production'
  })
  res.send({meg: 'login',token});
};

export const logout = async(req, res)=>{
  res.cookie('token', 'logout', {
    httpOnly: true, 
    expires: new Date(Date.now()),
    secure: process.env.NODE_ENV === 'production'
  })
  res.status(StatusCodes.OK).json({msg: 'logout', token: 'logout'});
}

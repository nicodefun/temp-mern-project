import { BadRequestError, UnauthenticatedError, UnauthorizedError } from "../errors/customErrors.js";
import { verifyJWT } from "../util/tokenutil.js";

export const authenticateUser = async (req, res, next) => {
  // console.log(req.cookies);
  const { token } = req.cookies;
  try {
    const user = verifyJWT(token);
    const {userId, userRole} = user;
    const testUser = userId === '65706f99688927f8722318cd'
    req.user = {userId, userRole, testUser}; //create it
    // console.log(user);
    next();
  } catch (err) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (...roles) =>{
  return(req,  res, next)=>{
    // console.log(roles);
    if(!roles.includes(req.user.userRole)) throw new UnauthorizedError('Unauthorized to access this route')
    next();
  }
}

export const checkForTestUser = (req, res, next)=>{
  if(req.user.testUser) throw new BadRequestError('Demo user. read only.')
  next();
}
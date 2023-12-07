import bcrypt from 'bcryptjs';

export const hashPassword = async (password)=>{
const salt = await bcrypt.genSalt(10);
return await bcrypt.hash(password, salt);
}

export const comparePassword = async(inputPassword, hashedPassword)=>{
    const isMatch = await bcrypt.compare(inputPassword, hashedPassword)
    return isMatch;
}
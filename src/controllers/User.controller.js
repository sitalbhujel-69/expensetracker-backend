import { User } from "../models/User.model.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../utils/jwt.js";
import { sendEmail } from "../utils/sendEmail.js";


const registerUser  = async (req,res)=>{
 const {fullname,email,password} = req.body;
 try {
  const doExist =await User.findOne({email});
  if(doExist){
    console.log(doExist)
    return res.status(400).json({message:"user already exists with this email"})
  }
  const otp = Math.floor(100000+Math.random()*900000).toString();
  const user = await User.create({
    fullname,
    email,
    password,
    otp,
    otpExpiry:Date.now()+5*60*1000,
  })
  await sendEmail(
      email,
      otp,
      `\n\n your OTP is ${otp} \n\n It will expires in 5 minutes`
    );

    return res.status(200).json({message:"user created. please verify your email",user})
 } catch (error) {
  console.error(error);
  return res.status(500).json({message:"something went wrong while creating the user!"})
 }
}

const verifyOtp = async (req,res)=>{
  const {email,otp} = req.body;

  try {
    const user = await User.findOne({email});
    if(!user || !user.otp){
      return res.status(404).json({message:"invalid user or otp"})
    }
    const isMatch  = bcrypt.compare(otp,user.otp)
    if(!isMatch){
      return res.status(400).json({message:"Wrong otp"})
    };
    if(Date.now()>user.otpExpiry){
      return res.status(400).json({message:"OTP expired"})
    }
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry=undefined;
    await user.save();
    return res.status(200).json({message:"User verified"})
  } catch (error) {
    return res.status(500).json({message:"something went wrong while verifying user"})
  }
}

const loginUser = async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    const isValid =await bcrypt.compare(password,user.password);
    if(!isValid){
      return res.status(401).json({message:"Invalid password!"})
    }
    const token = generateToken(user);

    return res.status(200).cookie("token",token,{
      httpOnly:true,
      secure:false
    }).json({
      message:"user logged in successfully"
    })


  } catch (error) {
    console.error(error);
    return res.status(500).json({message:"something went wrong while logging in"})
  }
}

export {registerUser,verifyOtp,loginUser}
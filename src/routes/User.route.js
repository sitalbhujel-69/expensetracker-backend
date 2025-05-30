import { Router } from "express";
import { loginUser, registerUser, verifyOtp } from "../controllers/User.controller.js";

const route = Router();

route.post('/register',registerUser);
route.post('/login',loginUser)
route.post('/verify-otp',verifyOtp)

export default route
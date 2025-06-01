import { Router } from "express";
import { getSummary } from "../controllers/Summary.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";
const route = Router();

route.get('/getSummary',requireAuth,getSummary)

export default route
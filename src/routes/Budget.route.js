import { Router } from "express";
import { setBudget } from "../controllers/Budget.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const route = Router();

route.post('/setbudget',requireAuth,setBudget)

export default route
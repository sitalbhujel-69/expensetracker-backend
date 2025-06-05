import { Router } from "express";
import { getBudget, setBudget } from "../controllers/Budget.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const route = Router();

route.post('/setbudget',requireAuth,setBudget)
route.get('/getbudget',requireAuth,getBudget)

export default route
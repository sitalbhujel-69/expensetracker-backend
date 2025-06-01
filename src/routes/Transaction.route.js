import { Router } from "express";
import { deleteTransaction, getTransaction, setTransaction, updateTransaction } from "../controllers/Transaction.controller.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const route = Router();

route.post('/set',requireAuth,setTransaction)
route.get('/get',requireAuth,getTransaction)
route.delete('/delete/:id',requireAuth,deleteTransaction)
route.patch('/update/:id',requireAuth,updateTransaction)

export default route
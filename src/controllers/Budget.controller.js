import { Budget } from "../models/Budget.model.js";


const setBudget = async (req,res)=>{
  const userId = req.user?._id;
  const {amount,period,month,year} =req.body;
  try {
    const budget = await Budget.create({
      owner:userId,
      amount,
      period,
      month,
      year
    })
    return res.status(201).json({message:'budget set',budget})
  } catch (error) {
    console.error(error)
    return res.status(500).json({message:"something went wrong while creating budget"})
  }
}

export {setBudget}
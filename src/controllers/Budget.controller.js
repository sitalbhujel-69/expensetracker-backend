import { Budget } from "../models/Budget.model.js";


const setBudget = async (req,res)=>{
  const userId = req.user?._id;
  const {amount,period,month,year} =req.body;
  try {
    const existedBudget =await Budget.findOne({owner:userId,month})
    if(existedBudget){
      return res.status(400).json({message:"budget already set"})
    }
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

const getBudget = async (req,res)=>{
  const userId = req.user?._id;
  const {month,year} = req.query; 
  try {
    const budget = await Budget.findOne({
      owner:userId,
      year,
      month
    })
    if(!budget){
      return res.status(404).json({
        message:"Budget not found"
      })
    }
    return res.status(200).json({
      message:"Budget fetched successfully",
      data:budget
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({
      message:"something went wrong while fetching budget"
    })
  }
}

export {setBudget,getBudget}
import mongoose from "mongoose";
import { Transaction } from "../models/Transaction.model.js";
import { Budget } from "../models/Budget.model.js";



const getSummary = async (req, res) => {
  
  const userId = req.user?._id;
  const matchData = {
    owner:new mongoose.Types.ObjectId(userId)
  }
  const {category,start,end} = req.query;
  if(start && end){
    matchData.date = {
      $gte:new Date(start),
      $lte:new Date(end)
    }
  }
  if(category)matchData.category = category
  try {
    const result = await Transaction.aggregate([
      {
        $match: matchData,
      },
      {
        $group: {
          _id: "$type",
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);
    console.log(result);
    let income = 0;
    let expense = 0;

    result.forEach((item) => {
      item._id === "income" ? (income = item.total) : (expense = item.total);
    });
    const totalBudget =await Budget.findOne({owner:userId})
    console.log(totalBudget)
    const summary = {
      budget:totalBudget.amount,
      income,
      expense,
      savings:totalBudget.amount + income - expense,
    };

    return res.status(200).json({ summary });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "something went wrong while getting summary" });
  }
};

export { getSummary };

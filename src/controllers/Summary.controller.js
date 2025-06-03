import mongoose from "mongoose";
import { Transaction } from "../models/Transaction.model.js";



const getSummary = async (req, res) => {
  const { month } = req.query;
  let startDate;
  let endDate;
  if (month) {
    const [year, monthStr] = month.split("-");
    startDate = new Date(year, parseInt(monthStr) - 1, 1);
    endDate = new Date(year, parseInt(monthStr), 1);
    console.log(startDate, endDate);
  } else {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const monthStr = currentDate.getMonth();
    startDate = new Date(year,parseInt(monthStr)-1,1)
    endDate = new Date(year,parseInt(monthStr),1)
    console.log(startDate,endDate)
  }
  const userId = req.user?._id;
  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          owner: new mongoose.Types.ObjectId(userId),
          date: {
            $gte: startDate,
            $lte: endDate,
          },
        },
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

    const summary = {
      income,
      expense,
      savings: income - expense,
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

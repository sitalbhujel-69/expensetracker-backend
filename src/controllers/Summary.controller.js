import mongoose from "mongoose";
import { Transaction } from "../models/Transaction.model.js";

const getSummary = async (req, res) => {
  const userId = req.user?._id;

  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          owner: new mongoose.Types.ObjectId(userId),
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
    let income = 0;
    let expense = 0;

    result.forEach((item) => {
      if (item._id === "income") income = item.total;
      if (item._id === "expense") expense = item.total;
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

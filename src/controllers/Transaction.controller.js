import mongoose from "mongoose";
import { Transaction } from "../models/Transaction.model.js";

const setTransaction = async (req, res) => {
  const userId = req.user?._id;
  const { amount, category, date, type, description } = req.body;
  try {
    const transaction = await Transaction.create({
      owner: userId,
      amount,
      category,
      type,
      date,
      description,
    });
    return res.status(201).json({ message: "created", transaction });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while setting transactions" });
  }
};

const getTransaction = async (req, res) => {
  const userId = req.user?._id;
  try {
    const transactions = await Transaction.find({
      owner: new mongoose.Types.ObjectId(userId),
    });
    if (!transactions) {
      return res.status(404).json({
        message: "transactions not found",
      });
    }
    return res.status(200).json({
      message: "Successfully fetched transaction",
      transactions,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while fetching transaction",
    });
  }
};
const deleteTransaction = async (req, res) => {
  let { id } = req.params;
  id = id.trim();
  try {
    const deleted = await Transaction.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "transaction not found" });
    }
    return res.status(200).json({ message: "deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "something went wrong while deleting" });
  }
};

const updateTransaction = async (req, res) => {
  const { id } = req.params;
  const validFields = ["amount", "date", "type", "category", "description"];
  const updatedData = {};

  validFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      updatedData[field] = req.body[field];
    }
  });

  try {
    const update = await Transaction.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });
    if (!update) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    return res
      .status(200)
      .json({ message: "Updated successfully", update });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while updating" });
  }
};
export { setTransaction, getTransaction, deleteTransaction,updateTransaction };

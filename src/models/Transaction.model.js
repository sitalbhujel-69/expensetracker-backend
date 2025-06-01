import mongoose,{Schema} from "mongoose";

const transactionSchema = new Schema({
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true

  },
  amount :{
    type:Number,
    required:true
  },
  type:{
    type:String,
    enum:["income","expense"],
    required:true
  },
  category:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    required:true
  },
  description:{
    type:String,
    required:true
  }
},{timestamps:true})

export const Transaction = mongoose.model('Transaction',transactionSchema)
import mongoose,{Schema} from "mongoose";

const budgetSchema = new Schema({
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:true
  },
  amount:{
    type:Number,
    required:true
  },
  period:{
    type:String,
    enum:['weekly','monthly'],
    required:true
  },
  month:{
    type:Number,
    required:true
  },
  year:{
    type:Number,
    required:true
  }
},{timestamps:true})

budgetSchema.index({ user: 1, month: 1 }, { unique: true });


export const Budget = mongoose.model('Budget',budgetSchema)
import mongoose from "mongoose";

const connectToDb = async ()=>{
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connected successfully..`)
  } catch (error) {
    console.log("error while connecting to db. ",error)
  }
}

export {connectToDb}
import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new Schema({
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    validate:{
      validator: function(email){
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      },
      message: props => `${props.value} is not valid!`
    }
  },
  fullname:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
    minlength:8,
    validate: {
      validator: function (value) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
      },
      message: props =>
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
    }
  },
  isVerified:{
    type:Boolean,
    default:false
  },
  otp:{
    type:String
  },
  otpExpiry:{
    type:Date
  }
})

userSchema.pre('save',async function(next){
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password,10)
  }
  if(this.isModified('otp') && this.otp){
    this.otp = await bcrypt.hash(this.otp,10)
  }
  next()
})

export const User = mongoose.model('User',userSchema)
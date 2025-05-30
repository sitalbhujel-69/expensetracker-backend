import jwt from "jsonwebtoken";

const generateToken = (user) => {
  const { fullname, _id, email } = user;

  return jwt.sign({ fullname, email, _id }, process.env.SECRET_TOKEN_KEY, {
    expiresIn: process.env.SECRET_TOKEN_EXPIRY,
  });
};

const verifyToken = (token)=>{
  return jwt.verify(token,process.env.SECRET_TOKEN_KEY)
}

export {generateToken,verifyToken}
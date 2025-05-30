import jwt from 'jsonwebtoken'
const requireAuth = async (req,res,next)=>{

  const token = req.cookies.token;
  if(!token){
    return res.status(401).json({message:"unauthorized user"})
  }
  try {
    const decoded = await jwt.verify(token,process.env.SECRET_TOKEN_KEY)
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({message:"something went wrong"})
  }
}

export {requireAuth}
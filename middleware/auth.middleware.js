import jwt from "jsonwebtoken";
import "dotenv/config";

export const authenticate = async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ message: "Unauthorised: No token provided" });
  }

  try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user=decoded;
    next();
  } catch (err) {
    if(err.name ==="TokenExpiredError"){
      return res.status(401).json({message:"Unauthorized: Token expired."});
    }
    console.error("JWT verification error.",err);
    res.status(401).json({message:"Unauthorised: Invalid token"});
  }
};

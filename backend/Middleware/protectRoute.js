import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";

const protectRoute = async (req,res,next) => {
    const token = req.header("x-auth-token"); // Retrieve the token from headers

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied!" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
      const user = await User.findById(decoded.id).select("-password"); // Find the user and exclude password
  
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      req.user = user; // Attach the user object to the request
      next(); 
    } catch (error) {
      res.status(401).json({ message: "Invalid token!" });
    }
}

export default protectRoute;
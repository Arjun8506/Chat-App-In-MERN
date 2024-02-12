import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next)=>{
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({error: "Unauthorised - Login First"})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (!decoded) {
            return res.status(401).json({error: "Invalid Token"})
        }

        const user = await User.findOne(decoded.userid).select("-password");

        if (!user) {
            return res.status(401).json({error: "User Not Found in protectRoute"})
        }

        req.user = user

        next();

    } catch (error) {
        console.log("error in protectRoute component", error.message);
        return res.status(500).json({error: "Internal Server Error!"})
    }
}

export default protectRoute;
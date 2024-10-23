import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";
import AsyncHandler from "../utils/AsyncHandler.js";

// Middleware to optionally attach the user
export const optionalAuth = AsyncHandler(async (req, res, next) => {
    try {
        let token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");
        if (!token) {
            return next();
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken.id).select("-password -refreshToken");

        if (user) {
            req.user = user;
        }

        next();
    } catch (error) {
        console.log("Error verifying token:", error.message);
        next();
    }
});

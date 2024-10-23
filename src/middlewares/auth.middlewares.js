import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";
import AppError from "../utils/AppError.js";
import AsyncHandler from "../utils/AsyncHandler.js";

// Function to protect routes
export const protect = AsyncHandler(async (req, res, next) => {
    try {
        let token = req.cookies?.accessToken || req.headers["authorization"]?.replace("Bearer ", "");

        if(!token){
            res.status(401);
            throw new AppError(401, "You are Unauthorized");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken.id).select("-password -refreshToken");
        if(!user){
            res.redirect(`/app/users/login?redirect=${req.originalUrl}`);
        }

        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        res.redirect(`/app/users/login?redirect=${req.originalUrl}`);
    }
});



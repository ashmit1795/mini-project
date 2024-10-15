import jwt from "jsonwebtoken";
import { User } from "../models/users.models.js";
import AppError from "../utils/AppError.js";
import AsyncHandler from "../utils/AsyncHandler.js";

// Function to protect routes
export const protect = AsyncHandler(async (req, res, next) => {
    let token = req.cookies?.accessToken || req.headers?.authorization.split(" ")[1];

    if(!token){
        res.status(401);
        throw new AppError(401, "Unauthorized");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken.id).select("-password", "-refreshToken");
    if(!user){
        res.status(401);
        throw new AppError(401, "Unauthorized");
    }

    req.user = user;
    next();
});



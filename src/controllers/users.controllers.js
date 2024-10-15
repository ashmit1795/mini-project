import mongoose from "mongoose";
import asyncHandler from "../utils/AsyncHandler.js";
import AppError from "../utils/AppError.js";
import { User } from "../models/users.models.js";

// Function to register a new user
const registerUser = asyncHandler(async (req, res) => {
    let { username, email, password, age} = req.body;

    [username, email, password, age].forEach((field) => {
        if(!field.trim()){
            res.status(400);
            throw new AppError(400, "Please fill in all fields");
        }

        if(field === password && field.length < 6){
            res.status(400);
            throw new AppError(400, "Password must be at least 6 characters long");
        }

        if(field === age && field < 18){
            res.status(400);
            throw new AppError(400, "You must be at least 18 years old to register");
        }

        if (field === email) {
            if (!field.includes("@") || !field.includes(".")) {
                res.status(400);
                throw new AppError(400, "Please provide a valid email address");
            }
        }
    });

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if(existingUser){
        res.status(409);
        throw new AppError(409, "User already exists");
    }

    console.log(password)
    const newUser = await User.create({
        username,
        email,
        password: password,
        age
    })

    const createdUser = await User.findById(newUser._id);
    if(!createdUser){
        res.status(500);
        throw new AppError(500, "User could not be created");
    }

    res.status(201).json({ message: "User created successfully" });
});

export { registerUser };
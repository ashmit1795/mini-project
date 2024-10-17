import asyncHandler from "../utils/AsyncHandler.js";
import AppError from "../utils/AppError.js";
import { Post } from "../models/posts.model.js";
import { User } from "../models/users.models.js";

// Function to create a new post
const createPost = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const user = await User.findById(req.user._id);
    if(!content.trim()){
        res.status(400);
        throw new AppError(400, "Please provide some content");
    }

    const newPost = await Post.create({
        content,
        owner: user._id
    });
    if(!newPost){
        res.status(500);
        throw new AppError(500, "Post could not be created");
    }

    user.posts.push(newPost._id);
    await user.save({ validateBeforeSave: false });
    console.log(user);

    res.status(201)
        .redirect("/app/users/profile");
});

export { createPost };


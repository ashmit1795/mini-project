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

// Function to toggle like on a post
const toggleLike = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if(!post){
        res.status(404);
        throw new AppError(404, "Post not found");
    }

    const isLiked = post.likes.includes(user._id);
    if(!isLiked){
        post.likes.push(user._id);
        post.save({ validateBeforeSave: false });
    } else {
        post.likes.pull(user._id);
        post.save({ validateBeforeSave: false });
    }

    res.status(201)
        .redirect("/app/users/profile");
});

// Function to get a post
const getPost = async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if(!post){
        res.status(404);
        throw new AppError(404, "Post not found");
    }

    return post;
}

// Function to edit a post
const editPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { updatedContent } = req.body;
    if(!updatedContent.trim()){
        res.status(400);
        throw new AppError(400, "Please provide some content");
    }

    const post = await Post.findById(postId);

    post.content = updatedContent;
    await post.save({ validateBeforeSave: false });

    res.status(201)
        .redirect("/app/users/profile");
});

export { createPost, toggleLike, getPost, editPost };


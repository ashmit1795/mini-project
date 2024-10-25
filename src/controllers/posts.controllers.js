import asyncHandler from '../utils/AsyncHandler.js';
import AppError from '../utils/AppError.js';
import { Post } from '../models/posts.model.js';
import { User } from '../models/users.models.js';

// Function to create a new post
const createPost = asyncHandler(async (req, res) => {
    const { content } = req.body;
    const user = await User.findById(req.user._id);
    if (!content.trim()) {
        req.flash('error_msg', 'Please provide some content');
        return res.status(400).redirect('/app/users/profile');
    }

    const newPost = await Post.create({
        content,
        owner: user._id,
    });
    if (!newPost) {
        req.flash('error_msg', 'Post could not be created');
        return res.status(500).redirect('/app/users/profile');
    }

    user.posts.push(newPost._id);
    await user.save({ validateBeforeSave: false });

    req.flash('success_msg', 'Post created successfully');
    return res.status(201).redirect('/app/users/profile');
});

// Function to toggle like on a post
const toggleLike = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
        req.flash('error_msg', 'Post not found');
        return res.status(404).redirect('/app/posts/home');
    }

    const isLiked = post.likes.includes(user._id);
    if (!isLiked) {
        post.likes.push(user._id);
        post.save({ validateBeforeSave: false });
    } else {
        post.likes.pull(user._id);
        post.save({ validateBeforeSave: false });
    }

    const redirectUrl = req.query.redirect || '/app/posts/home';

    req.flash('success_msg', isLiked ? 'Like removed' : 'Post liked');
    return res.status(201).redirect(redirectUrl);
});

// Function to get a post
const getPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
        res.status(404);
        throw new AppError(404, 'Post not found');
    }

    return res.render('edit', {
        post: post,
    });
});

// Function to edit a post
const editPost = asyncHandler(async (req, res) => {
    const { postId } = req.params;
    const { updatedContent } = req.body;
    if (!updatedContent.trim()) {
        req.flash('error_msg', 'Please provide some content');
        return res.status(400).redirect('/app/users/profile');
    }

    const post = await Post.findById(postId);

    post.content = updatedContent;
    await post.save({ validateBeforeSave: false });

    req.flash('success_msg', 'Post updated successfully');
    return res.status(201).redirect('/app/users/profile');
});

// Function to get all posts
const getAllPosts = async (req, res) => {
    const posts = (await Post.find().populate('owner')).reverse();
    if (!posts) {
        req.flash('error_msg', 'No posts found');
        return res.status(404).redirect('/app/posts/home');
    }

    return res.status(201).render('home', {
        posts: posts,
        user: req.user,
    });
};

export { createPost, toggleLike, getPost, editPost, getAllPosts };

import asyncHandler from '../utils/AsyncHandler.js';
import { User } from '../models/users.models.js';
import AppError from '../utils/AppError.js';
import { Post } from '../models/posts.model.js';

// Function to register a new user
const registerUser = asyncHandler(async (req, res) => {
    let { username, email, password, age } = req.body;

    // Validate user input
    if (!username.trim() || !email.trim() || !password.trim() || !age) {
        req.flash('error_msg', 'Please fill in all fields');
        return res.status(400).redirect('/app/users/register');
    }

    if (password.length < 6) {
        req.flash('error_msg', 'Password must be at least 6 characters long');
        return res.status(400).redirect('/app/users/register');
    }

    if (age < 18) {
        req.flash('error_msg', 'You must be at least 18 years old to register');
        return res.status(400).redirect('/app/users/register');
    }

    if (!email.includes('@') || !email.includes('.')) {
        req.flash('error_msg', 'Please provide a valid email address');
        return res.status(400).redirect('/app/users/register');
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
        req.flash('error_msg', 'User already exists');
        return res.status(409).redirect('/app/users/register');
    }

    // Create new user
    const newUser = await User.create({ username, email, password, age });

    const createdUser = await User.findById(newUser._id);
    if (!createdUser) {
        req.flash('error_msg', 'User could not be created');
        return res.status(500).redirect('/app/users/register');
    }

    const { accessToken, refreshToken } = await generateTokens(createdUser._id);

    const options = {
        httpOnly: true,
        secure: true,
    };

    req.flash('success_msg', 'User created successfully');
    return res
        .status(201)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .redirect('/app/users/profile');
});

// Function to login a user
const loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        req.flash('error_msg', 'Please provide a username and password');
        return res.status(400).redirect('/app/users/login');
    }

    const user = await User.findOne({ username });
    if (!user) {
        req.flash('error_msg', 'User not found');
        return res.status(404).redirect('/app/users/login');
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        req.flash('error_msg', 'Incorrect password');
        return res.status(401).redirect('/app/users/login');
    }

    const { accessToken, refreshToken } = await generateTokens(user._id);

    const options = {
        httpOnly: true,
        secure: true,
    };

    const redirectUrl = req.query.redirect || '/app/posts/home';

    req.flash('success_msg', 'Login successful');
    return res
        .status(201)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .redirect(redirectUrl);
});

// Function to logout a user
const logoutUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) {
        req.flash('error_msg', 'User not found');
        return res.status(404).redirect('/app/users/login');
    }

    user.refreshToken = null;
    await user.save({ validateBeforeSave: false });

    req.flash('success_msg', 'You have logged out successfully');
    return res
        .status(200)
        .clearCookie('accessToken')
        .clearCookie('refreshToken')
        .redirect('/app/users/login');
});

// Function to get the user's profile
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('posts');
    if (!user) {
        req.flash('error_msg', 'User not found');
        return res.status(404).redirect('/app/users/login');
    }

    // Get liked posts
    const likedPosts = await Post.find({ likes: { $in: [user._id] } });

    return res.render('profile', { user, likedPosts });
});

export { registerUser, loginUser, logoutUser, getUserProfile };

// Function to generate access token and refresh token
async function generateTokens(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new AppError('User not found');
    }
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
}

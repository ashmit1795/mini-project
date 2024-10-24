import { Router } from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { createPost, editPost, getAllPosts, getPost, toggleLike } from "../controllers/posts.controllers.js";
import { optionalAuth } from "../middlewares/optionalAuth.middlewares.js";

const router = Router();

router.route("/home").get(optionalAuth, getAllPosts);
router.route("/").post(protect, createPost);
router.route("/like/:postId").get(protect, toggleLike);
router.route("/edit/:postId").get(protect, getPost).post(protect, editPost);


export default router;
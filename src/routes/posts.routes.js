import { Router } from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { createPost, toggleLike } from "../controllers/posts.controllers.js";

const router = Router();

router.route("/").post(protect, createPost);
router.route("/like/:postId").get(protect, toggleLike);


export default router;
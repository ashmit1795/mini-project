import { Router } from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { createPost } from "../controllers/posts.controllers.js";

const router = Router();

router.route("/").post(protect, createPost);


export default router;
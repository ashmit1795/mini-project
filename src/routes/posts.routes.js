import { Router } from "express";
import { protect } from "../middlewares/auth.middlewares.js";
import { createPost, editPost, getPost, toggleLike } from "../controllers/posts.controllers.js";

const router = Router();

router.route("/").post(protect, createPost);
router.route("/like/:postId").get(protect, toggleLike);
router.route("/edit/:postId").get(protect, async (req, res) => {
    res.render("edit", { 
        post: await getPost(req, res) 
    });
}).post(protect, editPost);


export default router;
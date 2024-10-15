import { Router } from "express";
import { registerUser } from "../controllers/users.controllers.js";

const router = Router();

router.route("/register").get(
    (req, res) => {
        res.render("register");
    }
).post(registerUser);

export default router;
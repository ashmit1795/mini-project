import { Router } from "express";
import { loginUser, registerUser } from "../controllers/users.controllers.js";

const router = Router();

router.route("/register").get(
    (req, res) => {
        res.render("register");
    }
).post(registerUser);

router.route("/login").get(
    (req, res) => {
        res.render("login");
    }
).post(loginUser);

export default router;
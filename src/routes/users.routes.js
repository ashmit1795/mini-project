import { Router } from "express";

const router = Router();

router.route("/register").get(
    (req, res) => {
        res.render("register");
    }
);

export default router;
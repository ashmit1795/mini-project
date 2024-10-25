import { Router } from 'express';
import {
    getUserProfile,
    loginUser,
    logoutUser,
    registerUser,
} from '../controllers/users.controllers.js';
import { protect } from '../middlewares/auth.middlewares.js';

const router = Router();

router
    .route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post(registerUser);

router
    .route('/login')
    .get((req, res) => {
        res.render('login');
    })
    .post(loginUser);

router.route('/logout').get(protect, logoutUser);
router.route('/profile').get(protect, getUserProfile);

export default router;

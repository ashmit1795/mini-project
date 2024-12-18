import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import session from 'express-session';
import flash from 'connect-flash';

export const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200,
};

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));

// Session and flash middleware
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 15, // Session expiry (15 minutes)
        },
    })
);

// Flash message middleware
app.use(flash());

// Pass flash messages to all views
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg')[0] || null;
    res.locals.error_msg = req.flash('error_msg')[0] || null;
    res.locals.error = req.flash('error')[0] || null; // For passport.js or general errors
    next();
});

// Static files
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
    res.redirect('/app/posts/home');
});

// Import routes
import userRouter from './routes/users.routes.js';
import postRouter from './routes/posts.routes.js';

// Use routes
app.use('/app/users', userRouter);
app.use('/app/posts', postRouter);

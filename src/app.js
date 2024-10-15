import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

export const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    optionsSuccessStatus: 200
}

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(corsOptions));

// Static files
app.use(express.static('public'));

// View engine
app.set('view engine', 'ejs');

// Import routes

// Use routes
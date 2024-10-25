import dotenv from 'dotenv';
import { app } from './app.js';
import connectDB from './db/index.js';

dotenv.config({
    path: './.env',
});

const port = process.env.PORT || 8080;

connectDB()
    .then(() => {
        app.on('error', (error) => {
            console.error(error);
            throw error;
        });

        app.listen(port, () => {
            console.log(`Server is listening on port ${port} `);
        });
    })
    .catch((error) => {
        console.error(error);
        throw error;
    });

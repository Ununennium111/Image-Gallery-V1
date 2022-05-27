// Dotenv
require('dotenv').config();

// Express
const express = require('express');
const app = express();

// Connect DB
const connectDB = require('./db/connect');

// Security Packages
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Error Handler
const notFoundMiddleware = require('./middlewares/not-found');

// Additional Packages
const morgan = require('morgan');

// Middlewares
app.use(express.json());
app.set('trust proxy', 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000,
        max: 100
    })
);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());
app.use(morgan('dev'));

// Error Handler Middlewares
app.use(notFoundMiddleware);

// Set Port
app.set('port', process.env.port || 3000);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}...`));
    } catch (error) {
        console.log(error);
    }
}

start();
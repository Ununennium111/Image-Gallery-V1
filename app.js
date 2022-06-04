// Dotenv
require('dotenv').config();

// Express
const express = require('express');
const app = express();

//Express-async-errors
require('express-async-errors');

// Fileupload
const fileUpload = require('express-fileupload');

// Cloundinary
const cloudinary = require('cloudinary').v2;
cloudinary.config(
    {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET
    }
);

// Connect DB
const connectDB = require('./db/connect');

// Security Packages
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Routers
const authRouter = require('./routes/auth-routes');
const imageRouter = require('./routes/image-routes');

// Authenticate User
const authMiddleware = require('./middlewares/authentication');

// Error Handler
const notFoundMiddleware = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');

// Additional Packages
const morgan = require('morgan');

// Middlewares
app.use(express.json());
app.use(fileUpload({useTempFiles: true}));

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

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/image', authMiddleware, imageRouter);

// Error Handler Middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

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
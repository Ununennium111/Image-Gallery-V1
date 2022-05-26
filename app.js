// Dotenv
require('dotenv').config();

// Express
const express = require('express');
const app = express();

// Security Packages
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

// Additional Packages
const morgan = require('morgan');

// Middlewares
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

// Set Port
app.set('port', process.env.port || 3000);

app.listen(app.get('port'), () => console.log(`Server running on port ${app.get('port')}...`));
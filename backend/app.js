const express = require('express');
const cookieParser = require('cookie-parser');
const errorMiddleware = require('./middlewares/error');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static('public'));

if (process.env.NODE_ENV != "production") {
    require('dotenv').config({ path: 'backend/config/config.env' });
}

// import routes
const post = require('./routes/postRoute');
const user = require('./routes/userRoute');
const chat = require('./routes/chatRoute');
const message = require('./routes/messageRoute');

app.use('/api/v1', post);
app.use('/api/v1', user);
app.use('/api/v1', chat);
app.use('/api/v1', message);

// error middleware
app.use(errorMiddleware);

module.exports = app;
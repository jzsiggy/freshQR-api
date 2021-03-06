require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');

const app = express()

const { mongooseConnect } = require('./assets/db');
mongooseConnect()

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: true,
    resave: false,
    cookie: { secure: false , maxAge: null },
}))

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json());

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))

const { codeRouter } = require('./route');
app.use('/api/qr', codeRouter);

const { authRouter } = require('./route');
app.use('/api/auth', authRouter);

app.listen(process.env.PORT, 
    () => console.log(`Listening for connections on port ${process.env.PORT}`)
);
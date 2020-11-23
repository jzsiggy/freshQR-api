const express = require('express');
const authRouter = express.Router();

const {
    login,
    logout,
    signup
} = require('../controller');

authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/signup', signup);

module.exports = {
    authRouter
};
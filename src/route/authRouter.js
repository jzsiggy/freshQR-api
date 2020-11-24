const express = require('express');
const authRouter = express.Router();

const {
    login,
    logout,
    signup,
    getUser
} = require('../controller');

authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/signup', signup);
authRouter.get('/user', getUser);

module.exports = {
    authRouter
};
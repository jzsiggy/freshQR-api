const { authenticate } = require('./authenticate');
const { login } = require('./login');
const { logout } = require('./logout');
const { signup } = require('./signup');
const { getUser } = require('./getUser');

module.exports = {
    authenticate,
    login,
    logout,
    signup,
    getUser
}
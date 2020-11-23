const { authenticate } = require('./authenticate');
const { login } = require('./login');
const { logout } = require('./logout');
const { signup } = require('./signup');

module.exports = {
    authenticate,
    login,
    logout,
    signup
}
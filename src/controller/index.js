const { 
    deleteCode,
    generateCode,
    getCodes,
    getCodeContent,
    getCodeSpecs,
    updateCode 
} = require('./qr');

const {
    authenticate,
    login,
    logout,
    signup,
    getUser
} = require('./auth');

module.exports = {
    deleteCode,
    generateCode,
    getCodes,
    getCodeContent,
    getCodeSpecs,
    updateCode,

    authenticate,
    login,
    logout,
    signup,
    getUser
};
const {
    deleteCode,
    generateCode,
    getCodes,
    getCodeContent,
    getCodeSpecs,
    updateCode,
    moveCode
} = require('./qr');

const {
    authenticate,
    login,
    logout,
    signup,
    getUser
} = require('./auth');

const {
    createFolder,
    getFolders,
    updateFolder,
    deleteFolder
} = require('./folder');

module.exports = {
    deleteCode,
    generateCode,
    getCodes,
    getCodeContent,
    getCodeSpecs,
    updateCode,
    moveCode,

    authenticate,
    login,
    logout,
    signup,
    getUser,

    createFolder,
    getFolders,
    updateFolder,
    deleteFolder
};

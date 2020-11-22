const { deleteCode } = require('./qr/deleteCode');
const { generateCode } = require('./qr/generateCode');
const { getCodes } = require('./qr/getCodes');
const { getCodeContent } = require('./qr/getCodeContent');
const { updateCode } = require('./qr/updateCode');

module.exports = {
    deleteCode,
    generateCode,
    getCodes,
    getCodeContent,
    updateCode
};
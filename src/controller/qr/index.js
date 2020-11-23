const { deleteCode } = require('./deleteCode');
const { generateCode } = require('./generateCode');
const { getCodes } = require('./getCodes');
const { getCodeSpecs } = require('./getCodeSpecs');
const { getCodeContent } = require('./getCodeContent');
const { updateCode } = require('./updateCode');

module.exports = {
    deleteCode,
    generateCode,
    getCodes,
    getCodeContent,
    getCodeSpecs,
    updateCode
};
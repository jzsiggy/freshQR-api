const express = require('express');
const codeRouter = express.Router();

const { generateCode , deleteCode , getCodes , getCodeContent , getCodeSpecs , updateCode } = require('../controller');

codeRouter.post('/new', generateCode);
codeRouter.post('/delete', deleteCode);
codeRouter.get('/list', getCodes);
codeRouter.post('/update', updateCode);
codeRouter.get('/content/:alias', getCodeContent);
codeRouter.get('/specs/:alias', getCodeSpecs);

module.exports = {
    codeRouter
};
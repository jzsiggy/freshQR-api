const express = require('express');
const codeRouter = express.Router();

const { generateCode , deleteCode , getCodes , getCodeContent , getCodeSpecs , updateCode , authenticate } = require('../controller');


codeRouter.post('/new', authenticate, generateCode);
codeRouter.post('/delete', authenticate, deleteCode);
codeRouter.get('/list', authenticate, getCodes);
codeRouter.post('/update', authenticate, updateCode);
codeRouter.get('/specs/:alias', authenticate, getCodeSpecs);
codeRouter.get('/content/:alias', getCodeContent);

module.exports = {
    codeRouter
};
const express = require('express');
const router = express.Router();

const { generateCode , deleteCode , getCodes , getCodeContent , updateCode } = require('../controller');

router.post('/new', generateCode);
router.post('/delete', deleteCode);
router.get('/list', getCodes);
router.post('/update', updateCode);
router.get('/content/:alias', getCodeContent);

module.exports = {
    router
};
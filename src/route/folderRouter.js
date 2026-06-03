const express = require('express');
const folderRouter = express.Router();

const { createFolder , getFolders , updateFolder , deleteFolder , authenticate } = require('../controller');

folderRouter.post('/new', authenticate, createFolder);
folderRouter.get('/list', authenticate, getFolders);
folderRouter.post('/update', authenticate, updateFolder);
folderRouter.post('/delete', authenticate, deleteFolder);

module.exports = {
    folderRouter
};

const mongoose = require('mongoose');
const { Folder } = require('../../model');

const updateFolder = async (request, response, next) => {
    const { id, name, color } = request.body;
    const userID = request.session.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ 'message' : 'Invalid ID sent by client' });
    }

    const folder = await Folder.findById(id);
    if (!folder) {
        return response.status(400).json({ 'message' : 'Folder not registered in database' });
    }
    if (folder.owner != userID) {
        return response.status(400).json({ 'message' : 'Current user is not owner of folder' });
    }

    if (name !== undefined) {
        if (!name.trim()) {
            return response.status(400).json({ 'message' : 'Folder name cannot be empty' });
        }
        folder.name = name.trim();
    }
    if (color !== undefined) {
        folder.color = color;
    }

    try {
        const queryResult = await folder.save();
        return response.status(200).json(queryResult);
    }
    catch (err) {
        return response.status(400).json({ 'message' : 'Unable to update folder' });
    }
};

module.exports = {
    updateFolder
};

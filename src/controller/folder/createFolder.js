const { Folder } = require('../../model');

const createFolder = async (request, response, next) => {
    const { name, color } = request.body;
    const userID = request.session.user._id;

    if (!name || !name.trim()) {
        return response.status(400).json({ 'message' : 'Folder name cannot be empty' });
    }

    try {
        const folder = await Folder.create({
            name: name.trim(),
            color: color || null,
            owner: userID
        });
        return response.status(200).json(folder);
    }
    catch (err) {
        return response.status(400).json({ 'message' : 'Unable to create folder' });
    }
};

module.exports = {
    createFolder
};

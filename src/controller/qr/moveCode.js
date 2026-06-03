const mongoose = require('mongoose');
const { QRCode, Folder } = require('../../model');

const moveCode = async (request, response, next) => {
    const { id, folder } = request.body;
    const userID = request.session.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(400).json({ 'message' : 'Invalid ID sent by client' });
    }

    const code = await QRCode.findById(id);
    if (!code) {
        return response.status(400).json({ 'message' : 'ID not registered in database' });
    }
    if (code.owner != userID) {
        return response.status(400).json({ 'message' : 'Current user is not owner of QR code' });
    }

    // folder may be null/empty (unfile) or a folder the user owns.
    if (folder) {
        if (!mongoose.Types.ObjectId.isValid(folder)) {
            return response.status(400).json({ 'message' : 'Invalid folder ID sent by client' });
        }
        const target = await Folder.findById(folder);
        if (!target || target.owner != userID) {
            return response.status(400).json({ 'message' : 'Current user is not owner of folder' });
        }
        code.folder = folder;
    }
    else {
        code.folder = null;
    }

    try {
        const queryResult = await code.save();
        return response.status(200).json(queryResult);
    }
    catch (err) {
        return response.status(400).json({ 'message' : 'Unable to move QR code' });
    }
};

module.exports = {
    moveCode
};

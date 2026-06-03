const mongoose = require('mongoose');
const { Folder, QRCode } = require('../../model');

const deleteFolder = async (request, response, next) => {
    const { id } = request.body;
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

    const db = mongoose.connection;
    const session = await db.startSession();
    session.startTransaction();

    try {
        // Keep the codes — just unfile them.
        await QRCode.updateMany(
            { folder: id, owner: userID },
            { folder: null },
            { session: session }
        );

        const deleted = await Folder.findByIdAndDelete(id).session(session);

        await session.commitTransaction();
        session.endSession();
        return response.status(200).json(deleted);
    }
    catch {
        await session.abortTransaction();
        session.endSession();
        return response.status(400).json({ 'message' : 'Unable to delete folder' });
    }
};

module.exports = {
    deleteFolder
};

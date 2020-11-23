const mongoose = require('mongoose');
const { User , QRCode } = require('../../model');

const deleteCode = async (request, response, next) => {
    const codeID = request.body.id;
    const userID = request.session.user._id;

    const currentUser = await User.findById(userID);
    let { codes } = currentUser;
    if ( !codes.includes(codeID) ) {
        return response.status(400).json({ 'message' : 'Current user is not owner of QR code' })
    }

    const db = mongoose.connection;
    const session = await db.startSession();
    session.startTransaction();

    try {
        await User.updateOne(
            { _id: userID },
            { $pull: { codes: codeID } },
            { session: session }
        );

        let code = await QRCode.findByIdAndDelete(codeID).session(session)
        await session.commitTransaction();
        session.endSession();
        return response.status(200).json(code)
    } 
    catch {
        await session.abortTransaction();
        session.endSession();
        return response.status(400).json({ 'message' : 'Unable to delete QR code' })
    }
};

module.exports = {
    deleteCode
};
const cloudinary = require('cloudinary').v2
const mongoose = require('mongoose');
const { QRCode , User } = require('../../model');

const generateCode = async (request, response, next) => {
    const { name , alias , content } = request.body;
    const userID = request.session.user._id;

    let hasEmptyFields = [name , alias , content].some(value => !value);
    if (hasEmptyFields) {
        return response.status(400).json({ 'message' : 'Missing field inputs' })
    }

    let codeRegistered = await QRCode.find({ alias });
    if (codeRegistered.length) {
        return response.status(400).json({ 'message' : 'Alias already exists in database' });
    }

    cloudinary.uploader.upload(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://freshqr.io/${alias}`, 
        async (err, cloudinaryResult) => {
            if (err) {
                return response.status(400).json({ 'message' : 'Error saving QR code' });
            };

            const db = mongoose.connection;
            const session = await db.startSession();
            session.startTransaction();

            try {
                let newCode = await QRCode.create(
                    [{
                        name, 
                        alias, 
                        content,
                        image: cloudinaryResult.url,
                        owner: userID
                    }],
                    { session: session }
                )
                const codeID = newCode[0]._id;

                await User.updateOne(
                    { _id: userID },
                    { $push: { codes: codeID } },
                    { session: session }
                )

                await session.commitTransaction();
                session.endSession();
                return response.status(200).json(newCode[0])
            }

            catch {
                await session.abortTransaction();
                session.endSession();
                return response.status(400).json({ 'message' : 'Unable to save code to database' })
            }
        }
    );
};

module.exports = {
    generateCode
};
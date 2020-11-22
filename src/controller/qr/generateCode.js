const cloudinary = require('cloudinary').v2
const { QRCode } = require('../../model');

const generateCode = async (request, response, next) => {
    const { name , alias , content } = request.body;

    let codeRegistered = await QRCode.find({ alias });
    if (codeRegistered.length) {
        return response.status(400).json({ 'message' : 'Alias already exists in databse' });
    }

    cloudinary.uploader.upload(
        `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://freshqr.io/${alias}`, 
        (err, cloudinaryResult) => {
            if (err) {
                return response.status(400).json({ 'message' : 'Error saving QR code' });
            };

            QRCode.create({
                name, 
                alias, 
                content,
                image: cloudinaryResult.url
            })
            .then(queryResult => response.status(200).json(queryResult))
            .catch(err => response.status(400).json({ 'message' : 'Unable to save code to database' }))
        }
    );
};

module.exports = {
    generateCode
};
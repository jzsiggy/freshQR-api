const { QRCode } = require('../../model');

const deleteCode = (request, response, next) => {
    const { id } = request.body;

    QRCode.findByIdAndDelete(id)
    .then(queryResult => response.status(200).json(queryResult))
    .catch(err => response.status(400).json({ 'message' : 'Unable to delete QR code' }));
};

module.exports = {
    deleteCode
};
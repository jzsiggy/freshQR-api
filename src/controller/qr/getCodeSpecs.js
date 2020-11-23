const { QRCode } = require('../../model');

const getCodeSpecs = (request, response, next) => {
    const { alias } = request.params;
    const userID = request.session.user._id;

    QRCode.findOne({ alias })
    .then(queryResult => {
        if (queryResult.owner != userID) { return response.status(400).json({ 'message' : 'Current user is not owner of QR code' }) }
        if (queryResult) { return response.status(200).json(queryResult) }
        return response.status(400).json({ 'message' : 'Alias not registered on database' })
    })
    .catch(err => response.status(400).json({ 'message' : 'Unable to reach database' }))
}

module.exports = {
    getCodeSpecs
};
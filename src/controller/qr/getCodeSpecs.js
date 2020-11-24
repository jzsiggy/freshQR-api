const { QRCode } = require('../../model');

const getCodeSpecs = (request, response, next) => {
    const { alias } = request.params;
    const userID = request.session.user._id;

    QRCode.findOne({ alias })
    .then(queryResult => {
        if (!queryResult) { return response.status(400).json({ 'message' : 'Alias not registered on database' }) }
        if (queryResult.owner != userID) { return response.status(400).json({ 'message' : 'Current user is not owner of QR code' }) }
        return response.status(200).json(queryResult)
    })
    .catch(err => {
        console.log(err)
        response.status(400).json({ 'message' : "We've encountered a server error. Please try again localStorage." })
    })
}

module.exports = {
    getCodeSpecs
};
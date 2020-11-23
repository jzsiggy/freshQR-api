const { QRCode } = require('../../model');

const getCodes = (request, response, next) => {
    const userID = request.session.user._id;
    
    return QRCode.find({ owner : userID })
    .then(queryResult => response.status(200).json(queryResult))
    .catch(err => response.status(400).json({ 'message' : 'Unable to fetch database entries' }));
};

module.exports = {
    getCodes
};
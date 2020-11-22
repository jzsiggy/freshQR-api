const { QRCode } = require('../../model');

const getCodeContent = (request, response, next) => {
    const { alias } = request.params;

    QRCode.findOne({ alias })
    .then(queryResult => {
        if (queryResult) {
            return response.status(200).json(queryResult)
        }
        return response.status(400).json({ 'message' : 'Alias not registered on database' })
    })
    .catch(err => response.status(400).json({ 'message' : 'Unable to reach database' }))
}

module.exports = {
    getCodeContent
};
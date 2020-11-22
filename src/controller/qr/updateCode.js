const mongoose = require('mongoose');
const { QRCode } = require('../../model');

const updateCode = async (request, response, next) => {
    const { id , name , content } = request.body;

    const isValidID = mongoose.Types.ObjectId.isValid(id);
    if (!isValidID) {
        return response.status(400).json({ 'message' : 'Invalid ID sent by client' })
    }

    const code = await QRCode.findById(id);
    if (!code) {
        return response.status(400).json({ 'message' : 'ID not registered in database' })
    }

    if (name) {
        code.name = name
    }
    if (content) {
        code.content = content
    }

    let queryResult = await code.save()

    return response.status(200).json(queryResult)
}

module.exports = {
    updateCode
};
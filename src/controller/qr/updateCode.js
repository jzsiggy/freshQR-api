const mongoose = require('mongoose');
const { User , QRCode } = require('../../model');

const updateCode = async (request, response, next) => {
    const { id , name , content } = request.body;

    const userID = request.session.user._id;
    const currentUser = await User.findById(userID);
    let { codes } = currentUser;
    if ( !codes.includes(id) ) {
        return response.status(400).json({ 'message' : 'Current user is not owner of QR code' })
    }

    let hasEmptyFields = [id , name , content].some(value => !value);
    if (hasEmptyFields) {
        return response.status(400).json({ 'message' : 'Missing field inputs' })
    }

    if (!content.startsWith('http://') && !content.startsWith('https://')) {       
        return response.status(400).json({ 'message' : `url must start with 'http://' or 'https://'` })
    }

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
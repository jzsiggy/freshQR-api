const { Folder } = require('../../model');

const getFolders = (request, response, next) => {
    const userID = request.session.user._id;

    return Folder.find({ owner: userID })
    .then(queryResult => response.status(200).json(queryResult))
    .catch(err => response.status(400).json({ 'message' : 'Unable to fetch folders' }));
};

module.exports = {
    getFolders
};

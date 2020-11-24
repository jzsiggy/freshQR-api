const getUser = (request , response , next) => {
    if ( request.session.user ) { return response.status(200).json(request.session.user) }
    else { return response.status(400).json({ 'message' : 'User not logged in' }) }
};

module.exports = {
    getUser
};
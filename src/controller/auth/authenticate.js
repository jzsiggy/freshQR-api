const authenticate = (request, response, next) => {
	const currentUser = request.session.user
	if (!currentUser) {
		return response.status(400).json({ 'message' : 'User not logged in' })
	};
	next()
};

module.exports = {
	authenticate
};
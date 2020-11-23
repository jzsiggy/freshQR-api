const logout = (request , response , next) => {
    request.session.user = null;
    return response.status(200).json({ 'message' : 'Logout success' });
  };
  
module.exports = {
	logout,
};
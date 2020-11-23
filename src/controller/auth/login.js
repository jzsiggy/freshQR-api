const bcrypt = require('bcrypt');
const { User } = require('../../model');

const login = async (request, response, next) => {
  const {
    email,
    password,
  } = request.body;

  const searchResult = await User.findOne({ email });
  if ( !searchResult ) {
    return response.status(400).json({ 'message' : 'Email not registered in database' });
  }; 

	if ( !bcrypt.compareSync(password, searchResult.password) ) {
		return response.status(400).json({ 'message' : 'Incorrect password' });
	};

	request.session.user = searchResult;
	return response.status(200).json(searchResult);
};

module.exports = {
  login,
};
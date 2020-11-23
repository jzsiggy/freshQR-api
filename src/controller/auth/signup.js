const bcrypt = require('bcrypt');
const { User } = require('../../model');

const signup = async (request , response , next) => {
  const {
    email,
    password,
  } = request.body;

  let hasEmptyFields = [email, password].some(value => !value);
  if (hasEmptyFields) {
    return response.status(400).json({ 'message' : 'Missing signup information' });
  }

  const searchResult = await User.findOne({ email });
  if ( searchResult ) {
    return response.status(400).json({ 'message' : 'Email already registered' });
  } 
  
	const hashPass = bcrypt.hashSync(password, 10);
	User.create({
		email,
		password : hashPass,
	})
	.then(newUser => response.status(200).json(newUser))
	.catch(err => response.status(500).json({ 'message' : 'Unable to save user to database' }))
};

module.exports = {
  signup,
};
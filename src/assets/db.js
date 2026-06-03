const mongoose = require('mongoose');

const mongooseConnect = () => {
  mongoose.connect(`${process.env.DB_CONNECTIONSTRING}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // In production the migration owns index creation; don't build at boot.
    autoIndex: process.env.NODE_ENV !== 'production'
  })
  .then(response => console.log('Connected to mongoDB'))
  .catch(err => console.log('Error connecting to mongoDB\n', err));
};

module.exports = {
  mongooseConnect,
};
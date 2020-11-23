const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QRCodeSchema = new Schema({
  name : {
    type : String,
  },
  alias : {
    type : String,
  },
  content : {
    type : String,
  },
  image : {
    type : String,
  },
  owner : {
    type : Schema.Types.ObjectId, 
    ref: 'User' 
  }
});

const QRCode = mongoose.model('QRCode', QRCodeSchema);

module.exports = {
  QRCode,
};
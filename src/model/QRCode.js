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
  },
  folder : {
    type : Schema.Types.ObjectId,
    ref: 'Folder',
    default: null
  }
});

// Dashboard lists by owner (+ folder).
QRCodeSchema.index({ owner: 1, folder: 1 });
// NOTE: a unique { alias } index is deferred until production duplicates are
// resolved — see the "unique-alias" follow-up migration.

const QRCode = mongoose.model('QRCode', QRCodeSchema);

module.exports = {
  QRCode,
};
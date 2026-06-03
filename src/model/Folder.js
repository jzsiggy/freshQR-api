const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  name : {
    type : String,
  },
  color : {
    type : String,
  },
  owner : {
    type : Schema.Types.ObjectId,
    ref: 'User'
  }
});

// Folders are always queried by owner.
folderSchema.index({ owner: 1 });

const Folder = mongoose.model('Folder', folderSchema);

module.exports = {
  Folder,
};

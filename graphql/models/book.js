const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  ownedBy:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, { collection: 'book' });

module.exports = mongoose.model('Book', bookSchema);
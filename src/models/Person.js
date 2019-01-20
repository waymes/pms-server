const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// schema ===================================================
const personSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'You must provide a first name']
  },
  lastName: String,
  createdBy: { type: Schema.Types.ObjectId, ref: 'user' }
});

// Model's Class =============================================
const personModel = mongoose.model('person', personSchema);

module.exports = personModel;

const mongoose = require('mongoose');
const validator = require('validator');
const { lengthValidator } = require('../helpers/validators');
const Schema = mongoose.Schema;

// schema ===================================================
const personSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'You must provide a first name'],
    maxlength: lengthValidator('firstName', 25)
  },
  lastName: {
    type: String,
    maxlength: lengthValidator('lastName', 25)
  },
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email'],
    maxlength: lengthValidator('email', 62),
  },
  city: String,
  relation: {
    type: String,
    enum : ['FRIEND', 'RELATIVE', 'CO-WORKER', 'NONE'],
  },
  createdBy: { type: Schema.Types.ObjectId, ref: 'user' }
});

// Model's Class =============================================
const personModel = mongoose.model('person', personSchema);

module.exports = personModel;

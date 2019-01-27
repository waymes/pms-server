const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const validator = require('validator');
const { lengthValidator } = require('../helpers/validators');
const Schema = mongoose.Schema;

// schema ===================================================
const userSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'You must provide a first name'],
    maxlength: lengthValidator('firstName', 25)
  },
  lastName: {
    type: String,
    required: [true, 'You must provide a last name'],
    maxlength: lengthValidator('lastName', 25)
  },
  email: {
    type: String,
    unique: [true, 'Email has to be unique'],
    lowercase: true,
    validate: [validator.isEmail, 'Invalid Email'],
    maxlength: lengthValidator('email', 62),
    required: [true, 'You must provide an email']
  },
  city: String,
  password: {
    type: String,
    minlength: 5,
    maxlength: lengthValidator('password', 62),
    required: [true, 'You must provide a password']
  },
  people: [{ type: Schema.Types.ObjectId, ref: 'person' }]
});

// pre save hook ============================================
userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(candidataPassword, callback) {
  bcrypt.compare(candidataPassword, this.password, (err, isMatch) => {
    if (err) return callback(err);

    callback(null, isMatch);
  });
};

// Model's Class =============================================
const userModel = mongoose.model('user', userSchema);

module.exports = userModel;

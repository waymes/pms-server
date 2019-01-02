const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;

// schema ===================================================
const userSchema = new Schema({
  // id: new mongoose.mongo.ObjectID(),
  firstName: {
    type: String,
    required: [true, 'You must provide a first name']
  },
  lastName: {
    type: String,
    required: [true, 'You must provide a last name']
  },
  email: {
    type: String,
    unique: [true, 'Email has to be unique'],
    lowercase: true,
    required: [true, 'You must provide an email']
  },
  password: {
    type: String,
    required: [true, 'You must provide a password']
  }
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

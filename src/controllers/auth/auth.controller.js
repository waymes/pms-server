const jwt = require('jwt-simple');
const boom = require('boom');
const User = require('../../models/User');
const config = require('../../config');

const tokenForUser = user => {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.JWT_SECRET);
};

exports.signup = (req, res, next) => {
  const { email, password, firstName, lastName } = req.body;

  const user = new User({ email, password, firstName, lastName });

  user.save(err => {
    if (err) return next(boom.badImplementation(null, err));

    return res.status(201).json({ token: tokenForUser(user) });
  });
};

exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) return next(boom.badImplementation(null, err));
    if (!user) return next(boom.notFound('User not found'));

    user.comparePassword(password, (err, isMatch) => {
      if (err) return next(boom.badImplementation(null, err));
      if (!isMatch) return next(boom.notFound('Password is incorrect'));

      return res.status(200).send({ token: tokenForUser(user) });
    });
  });
};

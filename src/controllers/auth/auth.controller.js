const jwt = require('jwt-simple');
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
    if (err) return next(err);

    return res.status(201).json({ token: tokenForUser(user) });
  });
};

exports.signin = (req, res) => {
  res.status(200).send({ token: tokenForUser(req.user) });
};

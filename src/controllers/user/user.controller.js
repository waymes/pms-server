// const User = require('../../models/User');

exports.get = (req, res) => {
  const { firstName, lastName, email } = req.user;

  const user = { firstName, lastName, email };
  res.status(200).send(user);
};

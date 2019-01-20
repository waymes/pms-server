const authRoutes = require('./auth/auth.routes');
const userRoutes = require('./user/user.routes');
const peopleRoutes = require('./people/people.routes');
require('../services/passport');

module.exports = app => {
  app.use('/auth', authRoutes);
  app.use('/user', userRoutes);
  app.use('/people', peopleRoutes);
};

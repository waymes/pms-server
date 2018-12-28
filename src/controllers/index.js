const testRoutes = require('./test/test.routes');
const authRoutes = require('./auth/auth.routes');
require('../services/passport');

module.exports = app => {
  app.use('/test', testRoutes);
  app.use('/auth', authRoutes);
};

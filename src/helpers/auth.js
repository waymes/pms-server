const passport = require('passport');

exports.requireAuth = passport.authenticate('jwt', { session: false });

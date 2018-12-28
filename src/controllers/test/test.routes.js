const express = require('express');
const passport = require('passport');
// const passportService = require('../../services/passport');
const controller = require('./test.controller');

const router = express.Router();
const requireAuth = passport.authenticate('jwt', { session: false });

router.get('/', requireAuth, controller.test);

module.exports = router;

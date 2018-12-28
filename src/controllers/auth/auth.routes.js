const express = require('express');
const passport = require('passport');
const controller = require('./auth.controller');

const router = express.Router();
const requireSignin = passport.authenticate('local', { session: false });

router.post('/signup', controller.signup);
router.post('/signin', requireSignin, controller.signin);

module.exports = router;

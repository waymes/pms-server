const express = require('express');
const { requireAuth } = require('../../helpers/auth');
const controller = require('./user.controller');

const router = express.Router();

router.get('/', requireAuth, controller.get);

module.exports = router;

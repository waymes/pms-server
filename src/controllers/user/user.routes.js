const express = require('express');
const { requireAuth } = require('../../helpers/auth');
const controller = require('./user.controller');

const router = express.Router();

router.get('/', requireAuth, controller.get);
router.put('/:userId', requireAuth, controller.update);

module.exports = router;

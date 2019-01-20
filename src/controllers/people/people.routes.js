const express = require('express');
const { requireAuth } = require('../../helpers/auth');
const controller = require('./people.controller');

const router = express.Router();

router.post('/', requireAuth, controller.create);
router.get('/my', requireAuth, controller.listMyPeople);
router.get('/:id', requireAuth, controller.get);

module.exports = router;

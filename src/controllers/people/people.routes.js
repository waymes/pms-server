const express = require('express');
const { requireAuth } = require('../../helpers/auth');
const controller = require('./people.controller');

const router = express.Router();

router.post('/', requireAuth, controller.create);
router.get('/my', requireAuth, controller.listMyPeople);
router.get('/:personId', requireAuth, controller.get);
router.put('/:personId', requireAuth, controller.update);
router.delete('/:personId', requireAuth, controller.delete);

module.exports = router;

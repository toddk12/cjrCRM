const path = require('path');

const express = require('express');

const calendarController = require('../controllers/calendar');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/calendar', isAuth, calendarController.getCal);

module.exports = router;
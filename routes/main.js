const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const mainController = require('../controllers/main');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/home', isAuth, mainController.getHome);

module.exports = router;
const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const mainController = require('../controllers/main');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', mainController.getIndex);

router.get('/home', isAuth, mainController.getHome);

router.get('/closed', mainController.getClosed);

router.get('/notAuth', mainController.getNotAuth);

module.exports = router;
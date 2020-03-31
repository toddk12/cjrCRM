const path = require('path');

const express = require('express');

const listsController = require('../controllers/lists');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/estimatorList', isAuth, listsController.getEstList);

router.get('/estlEdit/:estId', isAuth, listsController.getEstlEdit);

router.post('/estlEdit', isAuth, listsController.postEstlEdit);

module.exports = router;
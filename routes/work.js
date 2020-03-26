const path = require('path');

const express = require('express');

const workController = require('../controllers/work');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/workOrderTot/:projectId', isAuth, workController.getWorkOrderTot);

router.get('/wos/:workId', isAuth, workController.getWos);

router.post('/wos', isAuth, workController.postWos);

router.get('/workOrder/:workId', isAuth, workController.getWorkOrder);

module.exports = router;
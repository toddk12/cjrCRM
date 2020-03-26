const path = require('path');

const express = require('express');

const roofController = require('../controllers/roof');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/roofCalc/:projectId', isAuth, roofController.getRoofCalc);

router.post('/roofCalc', isAuth, roofController.postRoofCalc);

router.get('/roofCalcEdit/:roofId', isAuth, roofController.getRoofCalcEdit);

router.post('/roofCalcEdit', isAuth, roofController.postRoofCalcEdit);

router.get('/roofOrder/:roofId', isAuth, roofController.getRoofOrder);

router.get('/rOrder/:roofId', isAuth, roofController.getROrder);

module.exports = router;
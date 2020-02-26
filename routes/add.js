const path = require('path');

const express = require('express');

const addController = require('../controllers/add');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-insurance', isAuth, addController.getAddInsurance);

router.post('/add-insurance', isAuth, addController.postAddInsurance);

router.get('/add-project', isAuth, addController.getAddProject);

router.post('/add-project', isAuth, addController.postAddProject);

router.get('/add-c-project', isAuth, addController.getAddCProject);

router.post('/add-c-project', isAuth, addController.postAddCProject);

router.get('/add-note/:projectId', isAuth, addController.getAddNote);

router.post('/add-note/', isAuth, addController.postAddNote);

module.exports = router;
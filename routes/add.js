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

router.get('/add-estimator', isAuth, addController.getAddEstimator);

router.post('/add-estimator', isAuth, addController.postAddEstimator);

router.get('/add-sales', isAuth, addController.getAddSales);

router.post('/add-sales', isAuth, addController.postAddSales);

router.get('/add-supervisor', isAuth, addController.getAddSupervisor);

router.post('/add-supervisor', isAuth, addController.postAddSupervisor);

router.get('/add-subcontractor', isAuth, addController.getAddSubcontractor);

router.post('/add-subcontractor', isAuth, addController.postAddSubcontractor);

router.get('/add-supplier', isAuth, addController.getAddSupplier);

router.post('/add-supplier', isAuth, addController.postAddSupplier);

router.get('/add-doc/:projectId', isAuth, addController.getAddDoc);

router.post('/add-doc', isAuth, addController.postAddDoc);

router.get('/document/:docId', isAuth, addController.getDownloadDoc);



module.exports = router;
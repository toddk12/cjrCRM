const path = require('path');

const express = require('express');

const projectsController = require('../controllers/projects');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/', projectsController.getIndex);

router.get('/projects/:stat', isAuth, projectsController.getProjects);

router.get('/project/:projectId', isAuth, projectsController.getProject);

router.post('/project/:projId', isAuth, projectsController.postChangeStatus2);

router.get('/ownerInfo/:projectId', isAuth, projectsController.getOwnerInfo);

router.post('/ownerInfo/', isAuth, projectsController.postOwnerInfo);

router.get('/ownerInfoC/:projectId', isAuth, projectsController.getOwnerInfoC);

router.post('/ownerInfoC/', isAuth, projectsController.postOwnerInfoC);

router.get('/generalInfo/:projectId', isAuth, projectsController.getGeneralInfo);

router.post('/generalInfo/', isAuth, projectsController.postGeneralInfo);

router.post('/savePg/:projectId', isAuth, projectsController.postGeneralRep);

router.get('/insuranceInfo/:projectId', isAuth, projectsController.getInsuranceInfo);

router.post('/insuranceInfo/', isAuth, projectsController.postInsuranceInfo);

router.get('/add-insurance', isAuth, projectsController.getAddInsurance);

router.post('/add-insurance', isAuth, projectsController.postAddInsurance);

router.get('/financialinfo/:projectId', isAuth, projectsController.getFinancialInfo);

router.get('/add-project', isAuth, projectsController.getAddProject);

router.post('/add-project', isAuth, projectsController.postAddProject);

router.get('/add-c-project', isAuth, projectsController.getAddCProject);

router.post('/add-c-project', isAuth, projectsController.postAddCProject);

router.post('/delete-project', isAuth, projectsController.postDeleteProject);

router.get('/docInfo/:projectId', isAuth, projectsController.getDocInfo);

router.get('/add-r-doc/:projectId', isAuth, projectsController.getAddRDoc);

router.post('/add-r-doc', isAuth, projectsController.postAddRDoc);

router.get('/add-note/:projectId', isAuth, projectsController.getAddNote);

router.post('/add-note/', isAuth, projectsController.postAddNote);

router.get('/fundsReceived/:projectId', isAuth, projectsController.getFundsReceived);

router.post('/fundsReceived', isAuth, projectsController.postFundsReceived);

router.get('/jobCosts/:projectId', isAuth, projectsController.getJobCosts);

router.post('/jobCosts', isAuth, projectsController.postJobCosts);

router.get('/additions/:projectId', isAuth, projectsController.getAdditions);

router.post('/additions', isAuth, projectsController.postAdditions);

router.get('/exclusions/:projectId', isAuth, projectsController.getExclusions);

router.post('/exclusions', isAuth, projectsController.postExclusions);

module.exports = router;
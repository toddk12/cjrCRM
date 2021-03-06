const path = require('path');

const express = require('express');

const projectsController = require('../controllers/projects');
const mainController = require('../controllers/main');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/close', mainController.getClosed);

router.get('/projects/:stat', isAuth, projectsController.getProjects);

router.get('/projects', isAuth, projectsController.getAllProjects);

router.get('/project/:projectId', isAuth, projectsController.getProject);

router.post('/project/:projId', isAuth, projectsController.postChangeStatus2);

router.get('/projectSM/:projectId', isAuth, projectsController.getProjectSM);

router.get('/ownerInfo/:projectId', isAuth, projectsController.getOwnerInfo);

router.post('/ownerInfo/', isAuth, projectsController.postOwnerInfo);

router.get('/ownerInfoC/:projectId', isAuth, projectsController.getOwnerInfoC);

router.post('/ownerInfoC/', isAuth, projectsController.postOwnerInfoC);

router.get('/generalInfo/:projectId', isAuth, projectsController.getGeneralInfo);

router.post('/generalInfo/', isAuth, projectsController.postGeneralInfo);

router.get('/insuranceInfo/:projectId', isAuth, projectsController.getInsuranceInfo);

router.post('/insuranceInfo/', isAuth, projectsController.postInsuranceInfo);

router.post('/delete-project', isAuth, projectsController.postDeleteProject);

router.get('/docInfo/:projectId', isAuth, projectsController.getDocInfo);

router.get('/fundsReceived/:projectId', isAuth, projectsController.getFundsReceived);

router.post('/fundsReceived', isAuth, projectsController.postFundsReceived);

router.get('/frEdit/:frId', isAuth, projectsController.getFrEdit);

router.post('/frEdit', isAuth, projectsController.postFrEdit);

router.get('/jobCosts/:projectId', isAuth, projectsController.getJobCosts);

router.post('/jobCosts', isAuth, projectsController.postJobCosts);

router.get('/jcEdit/:jcId', isAuth, projectsController.getJcEdit);

router.post('/jcEdit', isAuth, projectsController.postJcEdit);

router.get('/additions/:projectId', isAuth, projectsController.getAdditions);

router.post('/additions', isAuth, projectsController.postAdditions);

router.get('/addEdit/:addId', isAuth, projectsController.getAddEdit);

router.post('/addEdit', isAuth, projectsController.postAddEdit);

router.get('/exclusions/:projectId', isAuth, projectsController.getExclusions);

router.post('/exclusions', isAuth, projectsController.postExclusions);

router.get('/exclEdit/:exclId', isAuth, projectsController.getExclEdit);

router.post('/exclEdit', isAuth, projectsController.postExclEdit);

router.get('/ownero/:projectId', isAuth, projectsController.getOwnero);

router.post('/ownero', isAuth, projectsController.postOwnero);

router.get('/oopEdit/:oopId', isAuth, projectsController.getOopEdit);

router.post('/oopEdit', isAuth, projectsController.postOopEdit);

router.get('/wtb/:projectId', isAuth, projectsController.getWtb);

router.post('/wtb', isAuth, projectsController.postWtb);

router.get('/wtbEdit/:wtbId', isAuth, projectsController.getWtbEdit);

router.post('/wtbEdit', isAuth, projectsController.postWtbEdit);

router.get('/wtbTot/:projectId', isAuth, projectsController.getWtbTot);

router.get('/comEdit/:projectId', isAuth, projectsController.getComEdit);

router.post('/comEdit', isAuth, projectsController.postComEdit);

router.get('/comEditC/:projectId', isAuth, projectsController.getComEditC);

router.post('/comEditC', isAuth, projectsController.postComEditC);

router.get('/repPay/:projectId', isAuth, projectsController.getRepPay);

router.post('/repPay', isAuth, projectsController.postRepPay);

router.get('/rpEdit/:rpId', isAuth, projectsController.getRpEdit);

router.post('/rpEdit', isAuth, projectsController.postRpEdit);

router.get('/statusChg/:projectId/:statusId/:statusName', isAuth, projectsController.getStatChg);

router.post('/statusChg', isAuth, projectsController.postStatChg);
module.exports = router;
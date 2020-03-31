const path = require('path');

const express = require('express');

const listsController = require('../controllers/lists');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/estimatorList', isAuth, listsController.getEstList);

router.get('/estlEdit/:estId', isAuth, listsController.getEstlEdit);

router.post('/estlEdit', isAuth, listsController.postEstlEdit);

router.get('/supplierList', isAuth, listsController.getSupList);

router.get('/subcontractorList', isAuth, listsController.getSubList);

router.get('/insuranceList', isAuth, listsController.getInsList);

router.get('/salesList', isAuth, listsController.getSalList);

router.get('/supervisorList', isAuth, listsController.getSuperList);

module.exports = router;
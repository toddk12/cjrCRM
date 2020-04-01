const path = require('path');

const express = require('express');

const listsController = require('../controllers/lists');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/estimatorList', isAuth, listsController.getEstList);

router.get('/estlEdit/:estId', isAuth, listsController.getEstlEdit);

router.post('/estlEdit', isAuth, listsController.postEstlEdit);

router.get('/salesList', isAuth, listsController.getSalList);

router.get('/salEdit/:salId', isAuth, listsController.getSalEdit);

router.post('/salEdit', isAuth, listsController.postSalEdit);

router.get('/supervisorList', isAuth, listsController.getSupList);

router.get('/supEdit/:supId', isAuth, listsController.getSupEdit);

router.post('/supEdit', isAuth, listsController.postSupEdit);

router.get('/subcontractorList', isAuth, listsController.getSubList);

router.get('/subEdit/:subId', isAuth, listsController.getSubEdit);

router.post('/subEdit', isAuth, listsController.postSubEdit);

router.get('/supplierList', isAuth, listsController.getSuppList);

router.get('/suppEdit/:suppId', isAuth, listsController.getSuppEdit);

router.post('/suppEdit', isAuth, listsController.postSuppEdit);

router.get('/insuranceList', isAuth, listsController.getInsList);

router.get('/insEdit/:insId', isAuth, listsController.getInsEdit);

router.post('/insEdit', isAuth, listsController.postInsEdit);

module.exports = router;
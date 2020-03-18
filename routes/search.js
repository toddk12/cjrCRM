const path = require('path');

const express = require('express');

const searchController = require('../controllers/search');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/searchLn', isAuth, searchController.getSearchLn);

router.post('/searchLn', isAuth, searchController.postSearchLn);

router.get('/searchBn', isAuth, searchController.getSearchBn);

router.post('/searchBn', isAuth, searchController.postSearchBn);

router.get('/searchAdd', isAuth, searchController.getSearchAdd);

router.post('/searchAdd', isAuth, searchController.postSearchAdd);

router.get('/searchCty', isAuth, searchController.getSearchCty);

router.post('/searchCty', isAuth, searchController.postSearchCty);


module.exports = router;
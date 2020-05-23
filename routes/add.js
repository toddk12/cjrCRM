const path = require('path');
const fs = require('fs');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');

const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAcessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const uploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'elasticbeanstalk-us-west-2-324049635531',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        contentDisposition: 'attachment',
        key: (req, file, cb) => {
            cb(null, file.originalname + '-' + Date.now().toString());
        }
    })
});

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

router.post('/add-doc', [
    uploadS3.single('file')
],
isAuth, addController.postAddDoc);

router.get('/document/:docId', isAuth, addController.getDownloadDoc);

router.get('/deadDoc/:docId', isAuth, addController.getDeleteDoc);

router.get('/add-workOrder/:projectId', isAuth, addController.getAddWorkOrder);

router.post('/add-workOrder', isAuth, addController.postAddWorkOrder);

router.get('/add-no', isAuth, addController.getAddNo);

module.exports = router;
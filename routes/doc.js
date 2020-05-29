const path = require('path');
const fs = require('fs');

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');

const upload = require('../services/file-upload');

const singleUpload = upload.single('docFile');

const docController = require('../controllers/doc');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-doc/:projectId', isAuth, docController.getAddDoc);

router.post('/add-doc', isAuth, docController.postAddDoc);

router.post('/add-doc', function(req, res) {

    singleUpload(req, res, function(err) {
        return res.json({ 'fileUrl': req.file.location });
    });
});

router.get('/document/:docId', isAuth, docController.getDownloadDoc);

router.get('/deadDoc/:docId', isAuth, docController.getDeleteDoc);

module.exports = router;
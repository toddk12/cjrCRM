const path = require('path');
const fs = require('fs');

// const aws = require('aws-sdk');
// const multer = require('multer');
// const multerS3 = require('multer-s3');
const express = require('express');

// const s3 = new aws.S3({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAcessKey: process.env.AWS_SECRET_ACCESS_KEY
// });

// const uploadS3 = multer({
//     storage: multerS3({
//         s3: s3,
//         dirame: 'documents',
//         bucket: 'elasticbeanstalk-us-west-2-324049635531',
//         acl: 'public-read',
//         contentType: multerS3.AUTO_CONTENT_TYPE,
//         contentDisposition: 'attachment',
//         key: (req, file, cb) => {
//             cb(null, 'documents/file.originalname' + '-' + Date.now().toString());
//         }
//     })
// });

const docController = require('../controllers/doc');

const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/add-doc/:projectId', isAuth, docController.getAddDoc);

router.post('/add-doc', isAuth, docController.postAddDoc);

router.post('/add-doc', isAuth, docController.postAddDoc);

router.get('/document/:docId', isAuth, docController.getDownloadDoc);

router.get('/deadDoc/:docId', isAuth, docController.getDeleteDoc);

module.exports = router;
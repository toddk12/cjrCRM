const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    secretAcessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    region: 'us-west-2'
});

const s3 = new aws.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        acl: 'public-read',
        bucket: 'cjrdocuments',
        metadata: function(req, file, cb) {
            cb(null, { fieldname: file.fieldname });
        },
        key: (req, file, cb) => {
            cb(null, docFile + '-' + Date.now().toString())
        }
    })
});

module.exports = upload;
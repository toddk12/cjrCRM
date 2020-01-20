const path = require('path');

const express = require('express');
const { check, body } = require('express-validator');

const User = require('../models/user');

const authController = require('../controllers/auth');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/login', authController.getLogin);

router.post(
    '/login', [
        body('password').isLength({ min: 5 }).withMessage('Password must be at leaset 5 chacaters long')
    ],
    authController.postLogin);

router.get('/signup', authController.getSignup);

router.post(
    '/signup', [
        check('email')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .custom((value, { req }) => {
            return User.findOne({
                where: { email: value }
            }).then(userDoc => {
                if (userDoc) {
                    return Promise.reject('Email already is registered.');
                }
            });
        }),
        body('password').isLength({ min: 5 }).withMessage('Password must be at leaset 5 chacaters long'),
        // body('confirmPassword').equals('password').withMessage('Passwords do not match!')
    ],
    authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
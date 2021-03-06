const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const Sequelize = require('sequelize');
const { validationResult } = require('express-validator');

const Op = Sequelize.Op;

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.PRODKEY);

const User = require('../models/user');


exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login',
        pageTitle: '/login',
        errorMessage: message
    });
};

exports.postLogin = async(req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.render('auth/login', {
            path: '/login',
            pageTitle: '/login',
            errorMessage: errors.array()[0].msg
        });
    }
    try {
        const user = await User.findOne({
            where: { username: username }
        })
        if (!user) {
            req.flash('error', 'Invalid Username');
            return res.redirect('/login');
        }
        bcrypt
            .compare(password, user.password)
            .then(doMatch => {
                if (doMatch) {
                    req.session.isLoggedIn = true;
                    req.session.user = user;
                    return req.session.save(err => {
                        res.redirect('/home');
                    })
                }
                req.flash('error', 'Invalid Password');
                res.redirect('/login');
            })
            .catch(err => {
                console.log(err);
                res.redirect('/login');
            });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.getSignup = (req, res, next) => {
    let message = req.flash('serror');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    // if (req.session.user.role == 1) {
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: '/signup',
        errorMessage: message
    });
    //     } else {
    //         res.render('notAuth', {
    //             path: '/notAuth',
    //             pageTitle: 'Not Authorized to use this page',
    //             errorMessage: message
    //         });
    // }
};

exports.postSignup = (req, res, next) => {

    const ename = req.body.ename;
    const email = req.body.email;
    const username = req.body.username;
    const role = req.body.role;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);
    if (confirmPassword !== password) {
        res.message("Passwords do not match");
    };
    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('auth/signup', {
            path: '/signup',
            pageTitle: '/signup',
            errorMessage: errors.array()[0].msg
        });
    }
    bcrypt.hash(password, saltRounds, function(err, hash) {
        User.create({
                ename: ename,
                email: email,
                role: role,
                username: username,
                password: hash
            })
            .then(result => {
                res.redirect('/home');
                return sgMail.send({
                    to: email,
                    from: 'info@cjrestoration.com',
                    subject: 'Successfull Registration',
                    text: 'You have successfully registered on the CJ Restoration Operations Portal',
                    html: '<h1>You have successfully registered on the CJ Restoration Operations Portal</h1>',
                });

            })
            .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    })
};

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: message
    });
};

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({
                where: { email: req.body.email }
            })
            .then(user => {
                if (!user) {
                    req.flash('error', 'No account with that email found.');
                    return res.rediredt('/reset');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            })
            .then(result => {
                res.redirect('/login');
                return sgMail.send({
                    to: req.body.email,
                    from: 'info@cjrestoration.com',
                    subject: 'Password Reset',
                    text: 'You have successfully registered on the CJ Restoration Operations Portal',
                    html: `<p>You requested a password reset</p>
                    <p>Click on this <a href="http://localhost:3002/reset/${token}">Link</a> to set a new password.</p>`
                });
            })
            .catch(err => {
                const error = new Error(err);
                error.httpStatusCode = 500;
                return next(error);
            });
    });
};

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({
            where: {
                resetToken: token,
                resetTokenExpiration: {
                    [Op.gt]: Date.now()
                }
            }
        })
        .then(user => {
            let message = req.flash('error');
            if (message.length > 0) {
                message = message[0];
            } else {
                message = null;
            }
            res.render('auth/new-password', {
                path: '/new-password',
                pageTitle: 'New Password',
                errorMessage: message,
                userId: user.id.toString(),
                passwordToken: token
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;
    let resetUser;

    User.findOne({
            where: {
                resetToken: passwordToken,
                resetTokenExpiration: {
                    [Op.gt]: Date.now()
                },
                id: userId
            }
        })
        .then(user => {
            resetUser = user;
            return bcrypt.hash(newPassword, saltRounds);
        })
        .then(hashedPassword => {
            resetUser.password = hashedPassword;
            resetUser.resetToken = "";
            resetUser.resetTokenExpiration = "";
            return resetUser.save();
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
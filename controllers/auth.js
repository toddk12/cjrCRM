const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const Sequelize = require('sequelize');
const { validationResult } = require('express-validator/check');

const Op = Sequelize.Op;

const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const User = require('../models/user');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

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
        console.log(fundsRcvd);
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
    res.render('auth/signup', {
        path: '/signup',
        pageTitle: '/signup',
        errorMessage: message
    });
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
                return transporter.sendMail({
                    to: email,
                    from: 'info@cjrestoration.com',
                    subject: 'Register User Created',
                    html: '<h1>You have been successfully registered for the CJ Restoration Operations Portal</h1>'
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
                transporter.sendMail({
                    to: req.body.email,
                    from: 'info@cjrestoration.com',
                    subject: 'Password Reset',
                    html: `
                <p>You requested a password reset</p>
                <p>Click on this <a href="http://localhost:3002/reset/${token}">Link</a> to set a new password.</p>
                `
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
            console.log(user);
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
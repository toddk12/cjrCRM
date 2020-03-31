const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');

const Project = require('../models/project');
const Supervisor = require('../models/supervisor');
const Subcontractor = require('../models/subcontractor');
const Sales = require('../models/sales');
const Trades = require('../models/trades');
const Estimator = require('../models/estimator');

exports.getEstList = async(req, res, next) => {
    const userName = req.user.ename;

    try {
        const aestimator = await Estimator.findAll({
            where: { active: 1 },
            order: [
                ['name', 'ASC']
            ]
        })
        const estimator = await Estimator.findAll({
            where: { active: 0 },
            order: [
                ['name', 'ASC']
            ]
        })

        res.render('lists/estimatorList', {
            pageTitle: "List of Estimators",
            path: '/estimatorList',
            ests: estimator,
            aests: aestimator
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getEstlEdit = async(req, res, next) => {
    const estId = req.params.estId;
    try {
        const estimator = await Estimator.findOne({ where: { id: estId } })
        res.render('lists/estlEdit', {
            pageTitle: "Edit Estimator",
            path: '/estlEdit',
            estimator: estimator,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postEstlEdit = async(req, res, next) => {
    const estId = req.body.estId;
    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    const updatedActive = req.body.active;

    try {
        const estimator = await Estimator.findeOne({ where: { id: estId } })
        estimator.name = updatedName;
        estimator.email = updatedEmail;
        estimator.active = updatedActive;
        await estimator.save();

        const aestimator = await Estimator.findAll({
            where: { active: 1 },
            order: [
                ['name', 'ASC']
            ]
        })
        const uestimator = await Estimator.findAll({
            where: { active: 0 },
            order: [
                ['name', 'ASC']
            ]
        })

        res.render('lists/estimatorList', {
            pageTitle: "List of Estimators",
            path: '/estimatorList',
            ests: uestimator,
            aests: aestimator
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
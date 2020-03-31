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

exports.getSupList = async(req, res, next) => {
    const userName = req.user.ename;

    try {
        const supplier = await Supplier.findAll({
            order: [
                ['coName', 'ASC']
            ]
        })

        res.render('projects/supplierList', {
            pageTitle: "List of Suppliers",
            path: '/supplierList',
            sups: supplier
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getSubList = async(req, res, next) => {
    const userName = req.user.ename;

    try {
        const asubcontractor = await Subcontractor.findAll({
            where: { active: 1 },
            order: [
                ['coName', 'ASC']
            ]
        })
        const subcontractor = await Subcontractor.findAll({
            where: { active: 0 },
            order: [
                ['coName', 'ASC']
            ]
        })

        res.render('projects/subcontractorList', {
            pageTitle: "List of Subcontractors",
            path: '/subcontractorList',
            subs: subcontractor,
            asubs: asubcontractor
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getInsList = async(req, res, next) => {
    const userName = req.user.ename;

    try {
        const insurance = await Insurance.findAll({
            order: [
                ['coName', 'ASC']
            ]
        })

        res.render('projects/insuranceList', {
            pageTitle: "List of Insurance Companies",
            path: '/insuranceList',
            inss: insurance
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getSalList = async(req, res, next) => {
    const userName = req.user.ename;

    try {
        const asales = await Sales.findAll({
            where: { active: 1 },
            order: [
                ['name', 'ASC']
            ]
        })
        const sales = await Sales.findAll({
            where: { active: 0 },
            order: [
                ['name', 'ASC']
            ]
        })

        res.render('projects/salesList', {
            pageTitle: "List of Sales Representatives",
            path: '/salesList',
            sals: sales,
            asals: asales
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getSuperList = async(req, res, next) => {
    const userName = req.user.ename;

    try {
        const asupervisor = await Supervisor.findAll({
            where: { active: 1 },
            order: [
                ['name', 'ASC']
            ]
        })
        const supervisor = await Supervisor.findAll({
            where: { active: 0 },
            order: [
                ['name', 'ASC']
            ]
        })

        res.render('projects/supervisorList', {
            pageTitle: "List of Supervisors",
            path: '/supervisorList',
            spers: supervisor,
            aspers: asupervisor
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
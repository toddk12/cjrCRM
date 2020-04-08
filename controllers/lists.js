const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');

const Project = require('../models/project');
const Supervisor = require('../models/supervisor');
const Subcontractor = require('../models/subcontractor');
const Supplier = require('../models/supplier');
const Sales = require('../models/sales');
const Insurance = require('../models/insurance');
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
            estimator: estimator
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
        const estimator = await Estimator.findByPk(estId)

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

exports.getSalList = async(req, res, next) => {

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

        res.render('lists/salesList', {
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

exports.getSalEdit = async(req, res, next) => {
    const salId = req.params.salId;
    try {
        const sales = await Sales.findByPk(salId)
        res.render('lists/salEdit', {
            pageTitle: "Edit Sales Representative",
            path: '/salEdit',
            sales: sales
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postSalEdit = async(req, res, next) => {
    const salId = req.body.salId;

    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    const updatedActive = req.body.active;
    try {
        const sales = await Sales.findByPk(salId)

        sales.name = updatedName;
        sales.email = updatedEmail;
        sales.active = updatedActive;
        await sales.save();

        const asales = await Sales.findAll({
            where: { active: 1 },
            order: [
                ['name', 'ASC']
            ]
        })
        const usales = await Sales.findAll({
            where: { active: 0 },
            order: [
                ['name', 'ASC']
            ]
        })

        res.render('lists/salesList', {
            pageTitle: "List of Sales Representatives",
            path: '/salesList',
            sals: usales,
            asals: asales
        });

    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getSupList = async(req, res, next) => {

    try {
        const asupervisor = await Supervisor.findAll({
            where: { active: 1 },
            order: [
                ['name', 'ASC']
            ]
        })
        const usupervisor = await Supervisor.findAll({
            where: { active: 0 },
            order: [
                ['name', 'ASC']
            ]
        })

        res.render('lists/supervisorList', {
            pageTitle: "List of Supervisors",
            path: '/supervisorList',
            sups: usupervisor,
            asups: asupervisor
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getSupEdit = async(req, res, next) => {
    const supId = req.params.supId;
    try {
        const supervisor = await Supervisor.findByPk(supId)
        res.render('lists/supEdit', {
            pageTitle: "Edit Supervisor",
            path: '/supEdit',
            supervisors: supervisor
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postSupEdit = async(req, res, next) => {
    const supId = req.body.supId;

    const updatedName = req.body.name;
    const updatedEmail = req.body.email;
    const updatedActive = req.body.active;
    try {
        const supervisor = await Supervisor.findByPk(supId)

        supervisor.name = updatedName;
        supervisor.email = updatedEmail;
        supervisor.active = updatedActive;
        await supervisor.save();

        const asupervisor = await Supervisor.findAll({
            where: { active: 1 },
            order: [
                ['name', 'ASC']
            ]
        })
        const usupervisor = await Supervisor.findAll({
            where: { active: 0 },
            order: [
                ['name', 'ASC']
            ]
        })

        res.render('lists/supervisorList', {
            pageTitle: "List of Supervisors",
            path: '/supervisorList',
            sups: usupervisor,
            asups: asupervisor
        });

    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getSubList = async(req, res, next) => {

    try {
        const asubcontractor = await Subcontractor.findAll({
            where: { active: 1 },
            order: [
                ['coName', 'ASC']
            ]
        })
        const usubcontractor = await Subcontractor.findAll({
            where: { active: 0 },
            order: [
                ['coName', 'ASC']
            ]
        })

        res.render('lists/subcontractorList', {
            pageTitle: "List of Subcontractor",
            path: '/subcontractorList',
            subs: usubcontractor,
            asubs: asubcontractor
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getSubEdit = async(req, res, next) => {
    const subId = req.params.subId;

    try {
        const subcontractor = await Subcontractor.findByPk(subId)
        res.render('lists/subEdit', {
            pageTitle: "Edit Subcontractor",
            path: '/subEdit',
            subcontractor: subcontractor
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postSubEdit = async(req, res, next) => {
    const subId = req.body.subId;

    const updatedCoName = req.body.coName;
    const updatedContact = req.body.contact;
    const updatedAddress = req.body.address;
    const updatedAddress2 = req.body.address2;
    const updatedCity = req.body.city;
    const updatedState = req.body.state;
    const updatedZip = req.body.zip;
    const updatedPhone = req.body.phone;
    const updatedEmail = req.body.email;
    const updatedNotes = req.body.notes;
    const updatedActive = req.body.active;
    try {
        const subcontractor = await Subcontractor.findByPk(subId)

        subcontractor.coName = updatedCoName;
        subcontractor.contact = updatedContact;
        subcontractor.address = updatedAddress;
        subcontractor.address2 = updatedAddress2;
        subcontractor.city = updatedCity;
        subcontractor.state = updatedState;
        subcontractor.zip = updatedZip;
        subcontractor.phone = updatedPhone;
        subcontractor.email = updatedEmail;
        subcontractor.notes = updatedNotes;
        subcontractor.active = updatedActive;
        await subcontractor.save();

        const asubcontractor = await Subcontractor.findAll({
            where: { active: 1 },
            order: [
                ['coName', 'ASC']
            ]
        })
        const usubcontractor = await Subcontractor.findAll({
            where: { active: 0 },
            order: [
                ['coName', 'ASC']
            ]
        })

        res.render('lists/subcontractorList', {
            pageTitle: "List of Subcontractor",
            path: '/subcontractorList',
            subs: usubcontractor,
            asubs: asubcontractor
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getSuppList = async(req, res, next) => {

    try {
        const supplier = await Supplier.findAll({
            order: [
                ['coName', 'ASC']
            ]
        })

        res.render('lists/supplierList', {
            pageTitle: "List of Suppliers",
            path: '/supplierList',
            supps: supplier
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getSuppEdit = async(req, res, next) => {
    const suppId = req.params.suppId;

    try {
        const supplier = await Supplier.findByPk(suppId)
        res.render('lists/suppEdit', {
            pageTitle: "Edit Supplier",
            path: '/suppEdit',
            supps: supplier
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postSuppEdit = async(req, res, next) => {
    const suppId = req.body.suppId;

    const updatedCoName = req.body.coName;
    const updatedContact = req.body.contact;
    const updatedAddress = req.body.address;
    const updatedAddress2 = req.body.address2;
    const updatedCity = req.body.city;
    const updatedState = req.body.state;
    const updatedZip = req.body.zip;
    const updatedPhone = req.body.phone;
    const updatedEmail = req.body.email;
    const updatedNotes = req.body.notes;
    try {
        const supplier = await Supplier.findByPk(suppId)

        supplier.coName = updatedCoName;
        supplier.contact = updatedContact;
        supplier.address = updatedAddress;
        supplier.address2 = updatedAddress2;
        supplier.city = updatedCity;
        supplier.state = updatedState;
        supplier.zip = updatedZip;
        supplier.phone = updatedPhone;
        supplier.email = updatedEmail;
        supplier.notes = updatedNotes;
        await supplier.save();

        const asupplier = await Supplier.findAll({
            order: [
                ['coName', 'ASC']
            ]
        })

        res.render('lists/supplierList', {
            pageTitle: "List of Suppliers",
            path: '/supplierList',
            supps: asupplier
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getInsList = async(req, res, next) => {

    try {
        const insurance = await Insurance.findAll({
            order: [
                ['coName', 'ASC']
            ]
        })

        res.render('lists/insuranceList', {
            pageTitle: "List of Insurance Companies",
            path: '/insuranceList',
            insurance: insurance
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getInsEdit = async(req, res, next) => {
    const insId = req.params.insId;

    try {
        const insurance = await Insurance.findByPk(insId)
        res.render('lists/insEdit', {
            pageTitle: "Edit Insurance Company",
            path: '/insEdit',
            insurance: insurance
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postInsEdit = async(req, res, next) => {
    const insId = req.body.insId;

    const updatedCoName = req.body.coName;
    const updatedAddress = req.body.address;
    const updatedAddress2 = req.body.address2;
    const updatedCity = req.body.city;
    const updatedState = req.body.state;
    const updatedZip = req.body.zip;
    const updatedPhone1 = req.body.phone1;
    const updatedPhone2 = req.body.phone2;
    const updatedPhone3 = req.body.phone3;
    const updatedWebsite = req.body.website;
    const updatedEmail1 = req.body.email1;
    const updatedEmail2 = req.body.email2;
    try {
        const insurance = await Insurance.findByPk(insId)

        insurance.coName = updatedCoName;
        insurance.address = updatedAddress;
        insurance.address2 = updatedAddress2;
        insurance.city = updatedCity;
        insurance.state = updatedState;
        insurance.zip = updatedZip;
        insurance.phone1 = updatedPhone1;
        insurance.phone2 = updatedPhone2;
        insurance.phone3 = updatedPhone3;
        insurance.website = updatedWebsite;
        insurance.email1 = updatedEmail1;
        insurance.email2 = updatedEmail2;
        await insurance.save();

        const ainsurance = await Insurance.findAll({
            order: [
                ['coName', 'ASC']
            ]
        })

        res.render('lists/insuranceList', {
            pageTitle: "List of Insurance Companies",
            path: '/insuranceList',
            insurance: ainsurance
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
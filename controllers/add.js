const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Project = require('../models/project');
const Status = require('../models/status');
const Insurance = require('../models/insurance');
const Supervisor = require('../models/supervisor');
const Sales = require('../models/sales');
const Estimator = require('../models/estimator');
const Document = require('../models/document');
const Notes = require('../models/notes');
const Additions = require('../models/additions');
const Subcontractor = require('../models/subcontractor');
const Supplier = require('../models/supplier');
const FundsRcvd = require('../models/fundsRcvd');
const Exclusions = require('../models/exclusions');
const OwnerOop = require('../models/ownerOop');
const JobCosts = require('../models/jobCosts');
const Trades = require('../models/trades');
const RType = require('../models/rType');

exports.getAddInsurance = async(req, res, next) => {
    try {
        const insurance = await Insurance.findAll({
            order: [
                ['coName', 'ASC']
            ]
        })
        res.render('add/add-insurance', {
            pageTitle: "Add Insurance Company",
            path: '/add-insurance',
            insurance: insurance,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postAddInsurance = (req, res, next) => {

    Insurance.create({
            coName: req.body.coName,
            address: req.body.address,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone1: req.body.phone1,
            phone2: req.body.phone2,
            phone3: req.body.phone3,
            email1: req.body.email1,
            email2: req.body.email2,
            entBy: req.user.id
        })
        .then(result => {

            console.log('Insurance Co Added');
            res.redirect('/home');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAddProject = (req, res, next) => {
    Sales.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        .then(sales => {
            Insurance.findAll({
                    order: [
                        ['coName', 'ASC']
                    ]
                })
                .then(insurance => {
                    Supervisor.findAll({
                            order: [
                                ['name', 'ASC']
                            ]
                        })
                        .then(supervisor => {
                            Status.findAll()
                                .then(status => {
                                    Additions.findAll()
                                        .then(additions => {
                                            Project.findAll()
                                                .then(project => {
                                                    res.render('add/add-project', {
                                                        pageTitle: 'Add Residential Project',
                                                        path: '/add-project',
                                                        ins: insurance,
                                                        project: project,
                                                        supers: supervisor,
                                                        sal: sales,
                                                        status: status,
                                                    });
                                                })
                                        })
                                })
                        })
                })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postAddProject = (req, res, next) => {

    Project.create({
            projectNo: req.body.projectNo,
            statusId: req.body.statusId,
            owner1Fn: req.body.owner1Fn,
            owner1Ln: req.body.owner1Ln,
            owner2Fn: req.body.owner2Fn,
            owner2Ln: req.body.owner2Ln,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            hPhone: req.body.hPhone,
            cPhone: req.body.cPhone,
            oPhone: req.body.oPhone,
            email: req.body.email,
            saleId: req.body.saleId,
            supervisorId: req.body.supervisorId,
            insuranceId: req.body.insuranceId,
            policyNo: req.body.policyNo,
            claimNo: req.body.claimNo,
            dateLoss: req.body.dateLoss,
            typeLoss: req.body.typeLoss,
            deductible: req.body.deductible,
            oScopeDate: req.body.oScopeDate,
            oScopeRCV: req.body.oScopeRCV,
            adjName: req.body.adjName,
            adjPhone: req.body.adjPhone,
            entBy: req.user.id
        })
        .then(result => {

            console.log('Created Project');
            res.redirect('/home');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAddCProject = (req, res, next) => {
    Sales.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        .then(sales => {
            Insurance.findAll({
                    order: [
                        ['coName', 'ASC']
                    ]
                })
                .then(insurance => {
                    Supervisor.findAll({
                            order: [
                                ['name', 'ASC']
                            ]
                        })
                        .then(supervisor => {
                            Status.findAll()
                                .then(status => {
                                    Project.findAll()
                                        .then(project => {
                                            res.render('add/add-c-project', {
                                                pageTitle: 'Add Commercial Project',
                                                path: '/add-c-project',
                                                ins: insurance,
                                                project: project,
                                                supers: supervisor,
                                                sal: sales,
                                                status: status,
                                            });
                                        })
                                })
                        })
                })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postAddCProject = (req, res, next) => {

    Project.create({
            projectNo: req.body.projectNo,
            statusId: req.body.statusId,
            commercial: '1',
            bName: req.body.bName,
            bAddress: req.body.bAddress,
            bCity: req.body.bCity,
            bState: req.body.bState,
            bZip: req.body.bZip,
            ownerCoName: req.body.ownerCoName,
            owner1Fn: req.body.owner1Fn,
            owner1Ln: req.body.owner1Ln,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            hPhone: req.body.hPhone,
            cPhone: req.body.cPhone,
            oPhone: req.body.oPhone,
            email: req.body.email,
            pmCoName: req.body.pmCoName,
            pmContact: req.body.pmContact,
            pmAddress: req.body.pmAddress,
            pmCity: req.body.pmCity,
            pmState: req.body.pmState,
            pmZip: req.body.pmZip,
            pmPhone1: req.body.pmPhone1,
            pmPhone2: req.body.pmPhone2,
            pmEmail: req.body.pmEmail,
            saleId: req.body.saleId,
            supervisorId: req.body.supervisorId,
            insuranceId: req.body.insuranceId,
            policyNo: req.body.policyNo,
            claimNo: req.body.claimNo,
            dateLoss: req.body.dateLoss,
            typeLoss: req.body.typeLoss,
            deductible: req.body.deductible,
            oScopeDate: req.body.oScopeDate,
            oScopeRCV: req.body.oScopeRCV,
            adjName: req.body.adjName,
            adjPhone: req.body.adjPhone,
            entBy: req.user.id
        })
        .then(result => {
            console.log(result);
            console.log('Created Project');
            res.redirect('/home');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAddNote = async(req, res, next) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;
    const userId = req.user.id;
    try {
        const notes = await Notes.findAll({
            where: { projectId: projId },
            order: [
                ['entryDate', 'DESC']
            ]
        })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Notes
            }]
        })
        res.render('add/add-note', {
            pageTitle: "Add Note",
            path: '/add-note',
            project: project,
            projId: projId,
            userName: userName,
            userId: userId,
            note: notes
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.postAddNote = (req, res, next) => {

    Notes.create({
            enteredID: req.body.enteredID,
            enteredBy: req.body.enteredBy,
            projectId: req.body.projectId,
            entryDate: req.body.entryDate,
            note: req.body.note,
        })
        .then(project => {
            res.redirect('back');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAddEstimator = async(req, res, next) => {
    try {
        const estimator = await Estimator.findAll({})
        res.render('add/add-estimator', {
            pageTitle: "Add Estimator",
            path: '/add-estimator',
            estimator: estimator,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postAddEstimator = (req, res, next) => {

    Estimator.create({
            name: req.body.name,
            active: req.body.active,
        })
        .then(result => {

            console.log('Estimator Added');
            res.redirect('/home');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAddSales = async(req, res, next) => {
    try {
        const sales = await Sales.findAll({})
        res.render('add/add-sales', {
            pageTitle: "Add Sales Representative",
            path: '/add-sales',
            sales: sales,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postAddSales = (req, res, next) => {

    Sales.create({
            name: req.body.name,
            active: req.body.active,
        })
        .then(result => {

            console.log('Sales Representative Added');
            res.redirect('/home');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAddSupervisor = async(req, res, next) => {
    try {
        const supervisor = await Supervisor.findAll({})
        res.render('add/add-supervisor', {
            pageTitle: "Add Supervisor",
            path: '/add-supervisor',
            supervisor: supervisor,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postAddSupervisor = (req, res, next) => {

    Supervisor.create({
            name: req.body.name,
            active: req.body.active,
        })
        .then(result => {

            console.log('Supervisor Added');
            res.redirect('/home');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAddSubcontractor = async(req, res, next) => {
    try {
        const subcontractor = await Subcontractor.findAll({
            order: [
                ['coName', 'ASC']
            ]
        })
        res.render('add/add-subcontractor', {
            pageTitle: "Add Subcontractor",
            path: '/add-subcontractor',
            subcontractor: subcontractor,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postAddSubcontractor = (req, res, next) => {

    Subcontractor.create({
            coName: req.body.coName,
            address: req.body.address,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone: req.body.phone,
            email: req.body.email,
            notes: req.body.notes
        })
        .then(result => {

            console.log('Subcontractor');
            res.redirect('/home');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAddSupplier = async(req, res, next) => {
    try {
        const supplier = await Supplier.findAll({
            order: [
                ['coName', 'ASC']
            ]
        })
        res.render('add/add-supplier', {
            pageTitle: "Add Supplier",
            path: '/add-supplier',
            supplier: supplier,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postAddSupplier = (req, res, next) => {

    Supplier.create({
            coName: req.body.coName,
            address: req.body.address,
            address2: req.body.address2,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            phone: req.body.phone,
            email: req.body.email,
            notes: req.body.notes
        })
        .then(result => {

            console.log('Supplier');
            res.redirect('/home');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getAddDoc = (req, res, next) => {
    const projId = req.params.projectId;
    console.log("Yo");

    RType.findAll()
        .then(rType => {
            Document.findAll({
                    where: { projectId: projId }
                })
                .then(document => {
                    Project.findByPk(projId)
                        .then(project => {
                            res.render('add/add-doc', {
                                pageTitle: "Add Document",
                                path: '/add-doc',
                                project: project,
                                doc: document,
                                projId: projId,
                                types: rType
                            });
                        })
                })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.postAddDoc = (req, res, next) => {
    const projId = req.body.projectId;
    const docName1 = req.body.docName;
    const docFile = req.file.originalname;
    const docPath = req.file.path;
    console.log(projId);
    console.log(docName1);
    console.log(docFile);
    console.log(docPath);

    if (docName1 === "Other") {
        var docName = req.file.originalname;
    } else {
        var docName = docName1;
    }
    console.log(docName);
    Document.create({
        projectId: projId,
        docName: docName,
        docFile: docFile,
        docPath: docPath
    })

    .then(results => {
        RType.findAll()
            .then(rType => {
                Document.findAll({
                        where: { projectId: projId }
                    })
                    .then(document => {
                        Project.findByPk(projId)
                            .then(project => {
                                res.render('add/add-doc', {
                                    pageTitle: "Add Document",
                                    path: '/add-doc',
                                    project: project,
                                    doc: document,
                                    projId: projId,
                                    types: rType
                                });
                            })
                    })
            })
    })

    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};
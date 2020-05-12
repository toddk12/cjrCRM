const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const fs = require('fs');
const path = require('path');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.PRODKEY);


const PDFDocument = require('pdfkit');

const Project = require('../models/project');
const Status = require('../models/status');
const Insurance = require('../models/insurance');
const Supervisor = require('../models/supervisor');
const Subcontractor = require('../models/subcontractor');
const Supplier = require('../models/supplier');
const Sales = require('../models/sales');
const Document = require('../models/document');
const Notes = require('../models/notes');
const Additions = require('../models/additions');
const Fundsrcvd = require('../models/fundsrcvd');
const Exclusions = require('../models/exclusions');
const Ownero = require('../models/ownero');
const Jobcosts = require('../models/jobcosts');
const Trades = require('../models/trades');
const Estimator = require('../models/estimator');
const Reppay = require('../models/reppay');
const Wtb = require('../models/wtb');
const WorkOrder = require('../models/workorder');
const RoofCalc = require('../models/roofCalc');

exports.getAllProjects = async(req, res, next) => {
    try {
        const sales = await Sales.findAll()
        const status = await Status.findAll()
        const projects = await Project.findAll({
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Insurance
            }, {
                model: Status
            }],
            order: [
                ['owner1Ln', 'ASC']
            ]
        })
        res.render('projects/projects', {
            projs: projects,
            stat: status,
            sal: sales,
            pageTitle: 'Projects',
            path: '/projects',
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }

};

exports.getProjects = async(req, res, next) => {
    const statId = req.params.stat;
    try {
        const sales = await Sales.findAll()
        const status = await Status.findOne({ where: { id: statId } })
        const projects = await Project.findAll({
            where: { statusId: statId },
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Insurance
            }, {
                model: Status
            }],
            order: [
                ['owner1Ln', 'ASC']
            ]
        })
        res.render('projects/projects', {
            projs: projects,
            stat: status,
            sal: sales,
            pageTitle: 'Projects',
            path: '/projects',
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getProject = async(req, res, next) => {
    const projId = req.params.projectId;
    const username = req.session.username;
    const userid = req.session.userid;
    const userrole = req.session.user.role;
    try {
        const notes = await Notes.findAll({
            where: { projectId: projId },
            order: [
                ['entryDate', 'DESC']
            ]
        })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Status
            }, {
                model: Insurance
            }]
        })
        if (userrole == 5) {
            res.render('projects/projectSM', {
                project: project,
                note: notes,
                pageTitle: project.projectNo,
                path: '/projectSM',
            });
        } else {
            res.render('projects/project', {
                project: project,
                note: notes,
                pageTitle: project.projectNo,
                path: '/project',
            });
        }
    } catch (err) {
        const error = new Error(err);
        console.log(error);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getProjectSM = async(req, res, next) => {
    const projId = req.params.projectId;
    const username = req.session.username;
    const userid = req.session.userid;

    try {
        const notes = await Notes.findAll({
            where: { projectId: projId },
            order: [
                ['entryDate', 'DESC']
            ]
        })

        const project = await Project.findByPk(projId, {
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Status
            }, {
                model: Insurance
            }]
        })

        res.render('projects/projectSM', {
            project: project,
            note: notes,
            pageTitle: project.projectNo,
            path: '/projectSM',
        });
    } catch (err) {
        const error = new Error(err);
        console.log(error);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postDeleteProject = (req, res, next) => {
    const projId = req.body.projectId;
    Project.findByPk(projId)
        .then(project => {
            return project.destroy();
        })
        .then(result => {

            res.redirect('/home');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getOwnerInfo = async(req, res, next) => {
    const projId = req.params.projectId;
    try {
        const project = await Project.findByPk(projId, {
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Status
            }, {
                model: Insurance
            }]
        })
        res.render('projects/ownerInfo', {
            project: project,
            pageTitle: project.projectNo,
            path: '/ownerInfo',
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postOwnerInfo = (req, res, next) => {
    const projId = req.body.projectId;
    const updatedOwner1Fn = req.body.owner1Fn;
    const updatedOwner1Ln = req.body.owner1Ln;
    const updatedOwner2Fn = req.body.owner2Fn;
    const updatedOwner2Ln = req.body.owner2Ln;
    const updatedAddress = req.body.address;
    const updatedCity = req.body.city;
    const updatedState = req.body.state;
    const updatedZip = req.body.zip;
    const updatedhPhone = req.body.hPhone;
    const updatedcPhone = req.body.cPhone;
    const updatedoPhone = req.body.oPhone;
    const updatedEmail = req.body.email;
    Project.findByPk(projId, {
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Status
            }, {
                model: Insurance
            }]
        })
        .then(project => {
            project.owner1Fn = updatedOwner1Fn;
            project.owner1Ln = updatedOwner1Ln;
            project.owner2Fn = updatedOwner2Fn;
            project.owner2Ln = updatedOwner2Ln;
            project.address = updatedAddress;
            project.city = updatedCity;
            project.state = updatedState;
            project.zip = updatedZip;
            project.hPhone = updatedhPhone;
            project.cPhone = updatedcPhone;
            project.oPhone = updatedoPhone;
            project.email = updatedEmail;
            return project.save();
        }).then(project => {
            res.redirect('back');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getOwnerInfoC = async(req, res, next) => {
    const projId = req.params.projectId;
    try {
        const project = await Project.findByPk(projId, {
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Status
            }, {
                model: Insurance
            }]
        })
        res.render('projects/ownerInfoC', {
            project: project,
            pageTitle: project.projectNo,
            path: '/ownerInfo',
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postOwnerInfoC = (req, res, next) => {
    const projId = req.body.projectId;
    const updatedbName = req.body.bName;
    const updatedbAddress = req.body.bAddress;
    const updatedbCity = req.body.bCity;
    const updatedbState = req.body.bState;
    const updatedbZip = req.body.bZip;
    const updatedownerCoName = req.body.ownerCoName;
    const updatedowner1Fn = req.body.owner1Fn;
    const updatedowner1Ln = req.body.owner1Ln;
    const updatedaddress = req.body.address;
    const updatedcity = req.body.city;
    const updatedstate = req.body.state;
    const updatedzip = req.body.zip;
    const updatedhPhone = req.body.hPhone;
    const updatedcPhone = req.body.cPhone;
    const updatedoPhone = req.body.oPhone;
    const updatedEmail = req.body.email;
    const updatedpmCoName = req.body.pmCoName;
    const updatedpmContact = req.body.pmContact;
    const updatedpmAddress = req.body.pmAddress;
    const updatedpmCity = req.body.pmCity;
    const updatedpmState = req.body.pmState;
    const updatedpmZip = req.body.pmZip;
    const updatedpmPhon1 = req.body.pmPhon1;
    const updatedpmPhone2 = req.body.pmPhone2;
    const updatedpmEmail = req.body.pmEmail;
    Project.findByPk(projId, {
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Status
            }, {
                model: Insurance
            }]
        })
        .then(project => {
            project.bName = updatedbName;
            project.bAddress = updatedbAddress;
            project.bCity = updatedbCity;
            project.bState = updatedbState;
            project.bZip = updatedbZip;
            project.ownerCoName = updatedownerCoName;
            project.owner1Fn = updatedowner1Fn;
            project.owner1Ln = updatedowner1Ln;
            project.address = updatedaddress;
            project.city = updatedcity;
            project.state = updatedstate;
            project.zip = updatedzip;
            project.hPhone = updatedhPhone;
            project.cPhone = updatedcPhone;
            project.oPhone = updatedoPhone;
            project.email = updatedEmail;
            project.pmCoName = updatedpmCoName;
            project.pmContact = updatedpmContact;
            project.pmAddress = updatedpmAddress;
            project.pmCity = updatedpmCity;
            project.pmState = updatedpmState;
            project.pmZip = updatedpmZip;
            project.pmPhon1 = updatedpmPhon1;
            project.pmPhone2 = updatedpmPhone2;
            project.pmEmail = updatedpmEmail;
            return project.save();
        }).then(project => {
            res.redirect('back');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getGeneralInfo = async(req, res, next) => {
    const projId = req.params.projectId;
    try {
        const sales = await Sales.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        const supervisor = await Supervisor.findAll({
            order: [
                ['name', 'ASC']
            ]
        })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }]
        })
        res.render('projects/generalInfo', {
            pageTitle: project.projectNo,
            path: '/generalInfo',
            project: project,
            supers: supervisor,
            sal: sales
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postGeneralInfo = (req, res, next) => {
    const projId = req.body.projectId;
    const updatedProjectNo = req.body.projectNo;
    const updatedSaleId = req.body.saleId;
    const updatedSuperId = req.body.supervisorId;
    const updatedEntDate = req.body.entDate;
    const updatedEstDate = req.body.estDate;
    const updatedProdDate = req.body.prodDate;
    const updatedAiDate = req.body.aiDate;
    const updatedCloseDate = req.body.closeDate;
    const updatedCompDate = req.body.compDate;
    const updatedCollectDate = req.body.collectDate;
    const updatedCancelDate = req.body.cancelDate;
    const updatedDenyDate = req.body.denyDate;
    const updatedHoldDate = req.body.holdDate;
    console.log(updatedEntDate);
    Project.findByPk(projId, {
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Status
            }, {
                model: Insurance
            }]
        })
        .then(project => {
            project.projectNo = updatedProjectNo;
            project.saleId = updatedSaleId;
            project.supervisorId = updatedSuperId;
            project.entDate = updatedEntDate;
            project.estDate = updatedEstDate;
            project.prodDate = updatedProdDate;
            project.aiDate = updatedAiDate;
            project.closeDate = updatedCloseDate;
            project.compDate = updatedCompDate;
            project.collectDate = updatedCollectDate;
            project.cancelDate = updatedCancelDate;
            project.denyDate = updatedDenyDate;
            project.holdDate = updatedHoldDate;
            return project.save();
        }).then(project => {
            res.redirect('back');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getInsuranceInfo = async(req, res, next) => {
    const projId = req.params.projectId;
    try {
        const insurance = await Insurance.findAll({
            order: [
                ['coName', 'ASC']
            ]
        })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Insurance
            }]
        })
        res.render('projects/insuranceInfo', {
            pageTitle: "Insurance Details",
            project: project,
            insure: insurance,
            path: '/insuranceInfo'
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postInsuranceInfo = (req, res, next) => {
    const projId = req.body.projectId;
    const username = req.session.username;
    const userid = req.session.userid;
    const updatedInsuranceId = req.body.insuranceId;
    const updatedPolicyNo = req.body.policyNo;
    const updatedClaimNo = req.body.claimNo;
    const updatedDateLoss = req.body.dateLoss;
    const updatedTypeLoss = req.body.typeLoss;
    const updatedDeductible = req.body.deductible;
    const updatedOScopeDate = req.body.oScopeDate;
    const updatedOScopeRCV = req.body.oScopeRCV;
    const updatedFScopeDate = req.body.fScopeDate;
    const updatedFScopeRCV = req.body.fScopeRCV;
    const updatedAdjName = req.body.adjName;
    const phone1 = req.body.adjPhone1;
    const phone2 = req.body.adjPhone2;
    const phone3 = req.body.adjPhone3;
    const updatedAdjPhone = phone1 + phone2 + phone3;

    Project.findByPk(projId, {
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Status
            }, {
                model: Insurance
            }]
        })
        .then(project => {
            project.insuranceId = updatedInsuranceId;
            project.policyNo = updatedPolicyNo;
            project.claimNo = updatedClaimNo;
            project.dateLoss = updatedDateLoss;
            project.typeLoss = updatedTypeLoss;
            project.deductible = updatedDeductible;
            project.oScopeDate = updatedOScopeDate;
            project.oScopeRCV = updatedOScopeRCV;
            project.fScopeDate = updatedFScopeDate;
            project.fScopeRCV = updatedFScopeRCV;
            project.adjName = updatedAdjName;
            project.adjPhone = updatedAdjPhone;

            return project.save();
        }).then(project => {
            res.redirect('back');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getDocInfo = async(req, res, next) => {
    const projId = req.params.projectId;

    try {
        const document = await Document.findAll({
            where: { projectId: projId }
        })
        const project = await Project.findByPk(projId)
        res.redirect("home");
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postChangeStatus2 = (req, res, next) => {
    let projId = req.params.projId;
    let updatedStatus = req.body.newStat;
    let changedBy = req.user.id;
    let userName = req.user.ename;
    let userEmail = req.user.email;

    Project.findByPk(projId, {
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Status
            }, {
                model: Insurance
            }]
        })
        .then(project => {
            const projAddress = project.address;
            if (updatedStatus === 1) {
                project.statusId = updatedStatus;
                project.entBy = changedBy;
                project.entDate = new Date();
            } else {
                if (updatedStatus === 2) {
                    project.statusId = updatedStatus;
                    project.estBy = changedBy;
                    project.estDate = new Date();
                } else {
                    if (updatedStatus === 3) {
                        project.statusId = updatedStatus;
                        project.prodBy = changedBy;
                        project.prodDate = new Date();
                    } else {
                        if (updatedStatus === 4) {
                            project.statusId = updatedStatus;
                            project.aiBy = changedBy;
                            project.aiDate = new Date();
                        } else {
                            if (updatedStatus === 5) {
                                project.statusId = updatedStatus;
                                project.closeBy = changedBy;
                                project.closeDate = new Date();
                            } else {
                                if (updatedStatus === 6) {
                                    project.statusId = updatedStatus;
                                    project.compBy = changedBy;
                                    project.compDate = new Date();
                                } else {
                                    if (updatedStatus === 7) {
                                        project.statusId = updatedStatus;
                                        project.collectBy = changedBy;
                                        project.collectDate = new Date();
                                    } else {
                                        if (updatedStatus === 8) {
                                            project.statusId = updatedStatus;
                                            project.cancelBy = changedBy;
                                            project.cancelDate = new Date();
                                        } else {
                                            if (updatedStatus === 9) {
                                                project.statusId = updatedStatus;
                                                project.denyBy = changedBy;
                                                project.denyDate = new Date();
                                            }
                                            project.statusId = updatedStatus;
                                            project.holdBy = changedBy;
                                            project.holdDate = new Date();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            return project.save()
        })
        .then(project => {

            res.render('projects/project', {
                project: project,
                pageTitle: project.projectNo,
                path: '/project',
            });
        })
        .catch(err => {
            console.log(err)
        });
};

exports.getFundsReceived = async(req, res, next) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;
    const userId = req.user.id;

    try {
        const fundsrcvd = await Fundsrcvd.findAll({
            where: { projectId: projId }
        })
        const tots = await Fundsrcvd.sum('fundsAmt', { where: { projectId: projId } })
        console.log(tots);
        const project = await Project.findByPk(projId)
        project.totalFundsRcvd = tots;
        await project.save();
        res.render('projects/fundsReceived', {
            pageTitle: "Funds Received",
            path: '/fundsReceived',
            project: project,
            projId: projId,
            userName: userName,
            userId: userId,
            fR: fundsrcvd,
            totals: tots
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postFundsReceived = (req, res, next) => {

    Fundsrcvd.create({
            enteredBy: req.body.enteredBy,
            projectId: req.body.projectId,
            entryDate: req.body.entryDate,
            fundsAmt: req.body.fundsAmt,
            fundsDescription: req.body.fundsDescription
        })
        // .then(funds => {
        //     Project.findByPk(projId, {
        //             include: [{
        //                 model: Fundsrcvd
        //             }]
        //         })
        .then(project => {
            res.redirect('back');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getJobCosts = async(req, res, next) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;
    const userId = req.user.id;

    try {
        const trades = await Trades.findAll()
        const jobcosts = await Jobcosts.findAll({
            where: { projectId: projId },
            include: [{
                model: Trades
            }]
        })
        const tots = await Jobcosts.sum('costAmt', { where: { projectId: projId } })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Jobcosts
            }]
        })
        project.totalJobCosts = tots;
        project.save();
        res.render('projects/JobCosts', {
            pageTitle: "Job Costs",
            path: '/JobCosts',
            project: project,
            projId: projId,
            trade: trades,
            userName: userName,
            userId: userId,
            jC: jobcosts,
            totals: tots
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postJobCosts = (req, res, next) => {

    Jobcosts.create({
            enteredBy: req.body.enteredBy,
            projectId: req.body.projectId,
            entryDate: req.body.entryDate,
            costAmt: req.body.costAmt,
            costMemo: req.body.costMemo,
            tradeId: req.body.tradeId
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

exports.getAdditions = async(req, res, next) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;

    try {
        const trades = await Trades.findAll()
        const additions = await Additions.findAll({
            where: { projectId: projId },
            include: [{
                model: Trades
            }]
        })
        const tots = await Additions.sum('addAmt', { where: { projectId: projId } })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Additions
            }]
        })
        project.rcvChange = tots;
        project.save();
        res.render('projects/additions', {
            pageTitle: "Additions",
            path: '/additions',
            project: project,
            projId: projId,
            trade: trades,
            userName: userName,
            aD: additions,
            totals: tots
        });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postAdditions = (req, res, next) => {

    Additions.create({
            enteredBy: req.body.enteredBy,
            entryDate: req.body.entryDate,
            addAmt: req.body.addAmt,
            addMemo: req.body.addMemo,
            tradeId: req.body.tradeId,
            projectId: req.body.projectId
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

exports.getExclusions = async(req, res, next) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;
    const userId = req.user.id;
    try {
        const trades = await Trades.findAll()
        const exclusions = await Exclusions.findAll({
            where: { projectId: projId },
            include: [{
                model: Trades
            }]
        })
        const tots = await Exclusions.sum('exclAmt', { where: { projectId: projId } })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Exclusions
            }]
        })

        project.totalExclusions = tots;
        project.save();
        res.render('projects/exclusions', {
            pageTitle: "Exclusions",
            path: '/exclusions',
            project: project,
            projId: projId,
            trade: trades,
            userName: userName,
            userId: userId,
            aD: exclusions,
            totals: tots
        });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.postExclusions = (req, res, next) => {

    Exclusions.create({
            enteredBy: req.body.enteredBy,
            entryDate: req.body.entryDate,
            exclAmt: req.body.exclAmt,
            exclMemo: req.body.exclMemo,
            tradeId: req.body.tradeId,
            projectId: req.body.projectId
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

exports.getOwnero = async(req, res, next) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;
    const userId = req.user.id;
    try {
        const trades = await Trades.findAll()
        const ownero = await Ownero.findAll({
            where: { projectId: projId },
            include: [{
                model: Trades
            }]
        })
        const tots = await Ownero.sum('oopAmt', { where: { projectId: projId } })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Ownero
            }]
        })
        project.totalOwnerOop = tots;
        project.save();
        res.render('projects/ownero', {
            pageTitle: "Owner Out of Pocket",
            path: '/ownero',
            project: project,
            projId: projId,
            trade: trades,
            userName: userName,
            userId: userId,
            oops: ownero
        });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.postOwnero = (req, res, next) => {

    Ownero.create({
            enteredBy: req.body.enteredBy,
            entryDate: req.body.entryDate,
            oopAmt: req.body.oopAmt,
            oopMemo: req.body.oopMemo,
            tradeId: req.body.tradeId,
            projectId: req.body.projectId
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

exports.getWtb = async(req, res, next) => {
    const projId = req.params.projectId;

    try {
        const trades = await Trades.findAll()
        const wtb = await Wtb.findAll({
            where: { projectId: projId },
            include: [{
                model: Trades
            }]
        })
        const project = await Project.findByPk(projId)
        res.render('projects/wtb', {
            pageTitle: "Scope Work By Trade",
            path: '/wtb',
            project: project,
            projId: projId,
            trade: trades,
            wtbs: wtb,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postWtb = (req, res, next) => {
    const projId = req.body.projectId
    const tradeId = req.body.tradeId;
    const line = req.body.line;
    const rcv = req.body.rcv;
    const op = req.body.op;
    const net = (rcv - op);


    Wtb.create({
            projectId: projId,
            line: line,
            rcv: rcv,
            tradeId: tradeId,
            op: op,
            net: net,
        })
        .then(result => {
            res.redirect('back');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getWtbTot = async(req, res, next) => {
    const projId = req.params.projectId;

    try {
        const wtb = await Wtb.findAll({ where: { projectId: projId }, include: [{ model: Trades }] })
        const net1 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 1 } })
        const net2 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 2 } })
        const net3 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 3 } })
        const net4 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 4 } })
        const net5 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 5 } })
        const net6 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 6 } })
        const net7 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 7 } })
        const net8 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 8 } })
        const net9 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 9 } })
        const net10 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 10 } })
        const net11 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 11 } })
        const net12 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 12 } })
        const net13 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 13 } })
        const net14 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 14 } })
        const net15 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 15 } })
        const net16 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 16 } })
        const net17 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 17 } })
        const net18 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 18 } })
        const net19 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 19 } })
        const net20 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 20 } })
        const net21 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 21 } })
        const net22 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 22 } })
        const net23 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 23 } })
        const net24 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 24 } })
        const net25 = await Wtb.sum('net', { where: { projectId: projId, tradeId: 25 } })
        const netTot = await Wtb.sum('net', { where: { projectId: projId } })
        const additions = await Additions.findAll({ where: { projectId: projId }, include: [{ model: Trades }] })
        const add1 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 1 } })
        const add2 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 2 } })
        const add3 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 3 } })
        const add4 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 4 } })
        const add5 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 5 } })
        const add6 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 6 } })
        const add7 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 7 } })
        const add8 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 8 } })
        const add9 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 9 } })
        const add10 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 10 } })
        const add11 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 11 } })
        const add12 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 12 } })
        const add13 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 13 } })
        const add14 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 14 } })
        const add15 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 15 } })
        const add16 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 16 } })
        const add17 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 17 } })
        const add18 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 18 } })
        const add19 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 19 } })
        const add20 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 20 } })
        const add21 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 21 } })
        const add22 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 22 } })
        const add23 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 23 } })
        const add24 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 24 } })
        const add25 = await Additions.sum('addAmt', { where: { projectId: projId, tradeId: 25 } })
        const addTot = await Additions.sum('addAmt', { where: { projectId: projId } })
        const exclusions = await Exclusions.findAll({ where: { projectId: projId }, include: [{ model: Trades }] })
        const excl1 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 1 } })
        const excl2 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 2 } })
        const excl3 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 3 } })
        const excl4 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 4 } })
        const excl5 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 5 } })
        const excl6 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 6 } })
        const excl7 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 7 } })
        const excl8 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 8 } })
        const excl9 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 9 } })
        const excl10 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 10 } })
        const excl11 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 11 } })
        const excl12 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 12 } })
        const excl13 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 13 } })
        const excl14 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 14 } })
        const excl15 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 15 } })
        const excl16 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 16 } })
        const excl17 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 17 } })
        const excl18 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 18 } })
        const excl19 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 19 } })
        const excl20 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 20 } })
        const excl21 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 21 } })
        const excl22 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 22 } })
        const excl23 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 23 } })
        const excl24 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 24 } })
        const excl25 = await Exclusions.sum('exclAmt', { where: { projectId: projId, tradeId: 25 } })
        const exclTot = await Exclusions.sum('exclAmt', { where: { projectId: projId } })
        const ownero = await Ownero.findAll({ where: { projectId: projId }, include: [{ model: Trades }] })
        const oop1 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 1 } })
        const oop2 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 2 } })
        const oop3 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 3 } })
        const oop4 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 4 } })
        const oop5 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 5 } })
        const oop6 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 6 } })
        const oop7 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 7 } })
        const oop8 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 8 } })
        const oop9 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 9 } })
        const oop10 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 10 } })
        const oop11 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 11 } })
        const oop12 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 12 } })
        const oop13 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 13 } })
        const oop14 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 14 } })
        const oop15 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 15 } })
        const oop16 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 16 } })
        const oop17 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 17 } })
        const oop18 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 18 } })
        const oop19 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 19 } })
        const oop20 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 20 } })
        const oop21 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 21 } })
        const oop22 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 22 } })
        const oop23 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 23 } })
        const oop24 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 24 } })
        const oop25 = await Ownero.sum('oopAmt', { where: { projectId: projId, tradeId: 25 } })
        const oopTot = await Ownero.sum('oopAmt', { where: { projectId: projId } })
        const adj1 = (add1 - excl1 + oop1)
        const adj2 = (add2 - excl2 + oop2)
        const adj3 = (add3 - excl3 + oop3)
        const adj4 = (add4 - excl4 + oop4)
        const adj5 = (add5 - excl5 + oop5)
        const adj6 = (add6 - excl6 + oop6)
        const adj7 = (add7 - excl7 + oop7)
        const adj8 = (add8 - excl8 + oop8)
        const adj9 = (add9 - excl9 + oop9)
        const adj10 = (add10 - excl10 + oop10)
        const adj11 = (add11 - excl11 + oop11)
        const adj12 = (add12 - excl12 + oop12)
        const adj13 = (add13 - excl13 + oop13)
        const adj14 = (add14 - excl14 + oop14)
        const adj15 = (add15 - excl15 + oop15)
        const adj16 = (add16 - excl16 + oop16)
        const adj17 = (add17 - excl17 + oop17)
        const adj18 = (add18 - excl18 + oop18)
        const adj19 = (add19 - excl19 + oop19)
        const adj20 = (add20 - excl20 + oop20)
        const adj21 = (add21 - excl21 + oop21)
        const adj22 = (add22 - excl22 + oop22)
        const adj23 = (add23 - excl23 + oop23)
        const adj24 = (add24 - excl24 + oop24)
        const adj25 = (add25 - excl25 + oop25)
        const adjTot = (addTot - exclTot + oopTot)
        const Jobcosts = await Jobcosts.findAll({ where: { projectId: projId }, include: [{ model: Trades }] })
        const jc1 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 1 } })
        const jc2 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 2 } })
        const jc3 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 3 } })
        const jc4 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 4 } })
        const jc5 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 5 } })
        const jc6 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 6 } })
        const jc7 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 7 } })
        const jc8 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 8 } })
        const jc9 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 9 } })
        const jc10 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 10 } })
        const jc11 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 11 } })
        const jc12 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 12 } })
        const jc13 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 13 } })
        const jc14 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 14 } })
        const jc15 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 15 } })
        const jc16 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 16 } })
        const jc17 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 17 } })
        const jc18 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 18 } })
        const jc19 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 19 } })
        const jc20 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 20 } })
        const jc21 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 21 } })
        const jc22 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 22 } })
        const jc23 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 23 } })
        const jc24 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 24 } })
        const jc25 = await Jobcosts.sum('costAmt', { where: { projectId: projId, tradeId: 25 } })
        const jcTot = await Jobcosts.sum('costAmt', { where: { projectId: projId } })
        const project = await Project.findByPk(projId)

        res.render('projects/wtbTot', {
            pageTitle: "Budget By Trade",
            path: '/wtbTot',
            project: project,
            projId: projId,
            // trade: trades,
            wtbs: wtb,
            adds: additions,
            excls: exclusions,
            ownero: ownero,
            Jobcosts: Jobcosts,
            net1: net1,
            net2: net2,
            net3: net3,
            net4: net4,
            net5: net5,
            net6: net6,
            net7: net7,
            net8: net8,
            net9: net9,
            net10: net10,
            net11: net11,
            net12: net12,
            net13: net13,
            net14: net14,
            net15: net15,
            net16: net16,
            net17: net17,
            net18: net18,
            net19: net19,
            net20: net20,
            net21: net21,
            net22: net22,
            net23: net23,
            net24: net24,
            net25: net25,
            netTot: netTot,
            adj1: adj1,
            adj2: adj2,
            adj3: adj3,
            adj4: adj4,
            adj5: adj5,
            adj6: adj6,
            adj7: adj7,
            adj8: adj8,
            adj9: adj9,
            adj10: adj10,
            adj11: adj11,
            adj12: adj12,
            adj13: adj13,
            adj14: adj14,
            adj15: adj15,
            adj16: adj16,
            adj17: adj17,
            adj18: adj18,
            adj19: adj19,
            adj20: adj20,
            adj21: adj21,
            adj22: adj22,
            adj23: adj23,
            adj24: adj24,
            adj25: adj25,
            adjTot: adjTot,
            jc1: jc1,
            jc2: jc2,
            jc3: jc3,
            jc4: jc4,
            jc5: jc5,
            jc6: jc6,
            jc7: jc7,
            jc8: jc8,
            jc9: jc9,
            jc10: jc10,
            jc11: jc11,
            jc12: jc12,
            jc13: jc13,
            jc14: jc14,
            jc15: jc15,
            jc16: jc16,
            jc17: jc17,
            jc18: jc18,
            jc19: jc19,
            jc20: jc20,
            jc21: jc21,
            jc22: jc22,
            jc23: jc23,
            jc24: jc24,
            jc25: jc25,
            jcTot: jcTot
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getWtbEdit = async(req, res, next) => {
    const wtbId = req.params.wtbId;

    try {
        const trades = await Trades.findAll()
        const wtb = await Wtb.findByPk(wtbId, {
            include: [{
                model: Trades
            }]
        })
        const project = await Project.findByPk(wtb.projectId)
        res.render('projects/wtbEdit', {
            pageTitle: "Edit Scope Line Item",
            path: '/wtbEdit',
            wtbId: wtbId,
            project: project,
            trade: trades,
            wtb: wtb,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postWtbEdit = async(req, res, next) => {
    const wtbId = req.body.wtbId
    const projId = req.body.projectId;
    const updatedLine = req.body.line;
    const updatedRcv = req.body.rcv;
    const updatedOp = req.body.op;
    const updatedNet = (updatedRcv - updatedOp);
    const updatedTradeId = req.body.tradeId;

    try {
        const wtb = await Wtb.findByPk(wtbId)

        wtb.line = updatedLine;
        wtb.rcv = updatedRcv;
        wtb.op = updatedOp;
        wtb.net = updatedNet;
        wtb.tradeId = updatedTradeId;
        await wtb.save();
        const trades = await Trades.findAll()
        const wtbBack = await Wtb.findAll({
            where: { projectId: projId },
            include: [{
                model: Trades
            }]
        })
        const project = await Project.findByPk(projId)
        res.render('projects/wtb', {
            pageTitle: "Scope Work By Trade",
            path: '/wtb',
            project: project,
            projId: projId,
            trade: trades,
            wtbs: wtbBack
        })

    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getAddEdit = async(req, res, next) => {
    const addId = req.params.addId;
    const userName = req.user.ename;
    const userId = req.user.id;

    try {
        const trades = await Trades.findAll()
        const add = await Additions.findByPk(addId, {
            include: [{
                model: Trades
            }]
        })
        const project = await Project.findByPk(add.projectId)
        res.render('projects/addEdit', {
            pageTitle: "Edit Additions Line Item",
            path: '/addEdit',
            addId: addId,
            userName: userName,
            userId: userId,
            project: project,
            trade: trades,
            add: add,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postAddEdit = async(req, res, next) => {
    const addId = req.body.addId
    const projId = req.body.projectId;
    const updatedEnteredBy = req.body.enteredBy;
    const updatedEntryDate = req.body.entryDate;
    const updatedAddAmt = req.body.addAmt;
    const updatedAddMemo = req.body.addMemo;;
    const updatedTradeId = req.body.tradeId;
    const userName = req.user.ename;

    try {
        const add = await Additions.findByPk(addId)

        add.enteredBy = updatedEnteredBy;
        add.entryDate = updatedEntryDate;
        add.addAmt = updatedAddAmt;
        add.addMemo = updatedAddMemo;
        add.tradeId = updatedTradeId;
        await add.save();

        const trades = await Trades.findAll()
        const addBack = await Additions.findAll({
            where: { projectId: projId },
            include: [{
                model: Trades
            }]
        })
        const tots = await Additions.sum('addAmt', { where: { projectId: projId } })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Additions
            }, {
                model: Trades
            }]
        })
        project.rcvChange = tots;
        project.save();
        res.render('projects/additions', {
            pageTitle: "Additions",
            path: '/additions',
            project: project,
            projId: projId,
            trade: trades,
            userName: userName,
            aD: addBack,
            totals: tots
        });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getExclEdit = async(req, res, next) => {
    const exclId = req.params.exclId;
    const userName = req.user.ename;
    const userId = req.user.id;

    try {
        const trades = await Trades.findAll()
        const excl = await Exclusions.findByPk(exclId, {
            include: [{
                model: Trades
            }]
        })
        const project = await Project.findByPk(excl.projectId)
        res.render('projects/exclEdit', {
            pageTitle: "Edit Exclusions Line Item",
            path: '/exclEdit',
            exclId: exclId,
            userName: userName,
            userId: userId,
            project: project,
            trade: trades,
            excl: excl,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postExclEdit = async(req, res, next) => {
    const exclId = req.body.exclId
    const projId = req.body.projectId;
    const updatedEnteredBy = req.body.enteredBy;
    const updatedEntryDate = req.body.entryDate;
    const updatedExclAmt = req.body.exclAmt;
    const updatedExclMemo = req.body.exclMemo;;
    const updatedTradeId = req.body.tradeId;
    const userName = req.user.ename;

    try {
        const excl = await Exclusions.findByPk(exclId)

        excl.enteredBy = updatedEnteredBy;
        excl.entryDate = updatedEntryDate;
        excl.exclAmt = updatedExclAmt;
        excl.exclMemo = updatedExclMemo;
        excl.tradeId = updatedTradeId;
        await excl.save();

        const trades = await Trades.findAll()
        const exclBack = await Exclusions.findAll({
            where: { projectId: projId },
            include: [{
                model: Trades
            }]
        })
        const tots = await Exclusions.sum('exclAmt', { where: { projectId: projId } })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Additions
            }, {
                model: Trades
            }]
        })
        project.totalExclusions = tots;
        project.save();
        res.render('projects/exclusions', {
            pageTitle: "Exclusions",
            path: '/exclusions',
            project: project,
            projId: projId,
            trade: trades,
            userName: userName,
            aD: exclBack,
            totals: tots
        });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getOopEdit = async(req, res, next) => {
    const oopId = req.params.oopId;
    const userName = req.user.ename;
    const userId = req.user.id;

    try {
        const trades = await Trades.findAll()
        const oop = await Ownero.findByPk(oopId, {
            include: [{
                model: Trades
            }]
        })
        const project = await Project.findByPk(oop.projectId)
        res.render('projects/oopEdit', {
            pageTitle: "Edit Owner Out of Pocket Line Item",
            path: '/oopEdit',
            oopId: oopId,
            userName: userName,
            userId: userId,
            project: project,
            trade: trades,
            oop: oop,
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postOopEdit = async(req, res, next) => {
    const oopId = req.body.oopId
    const projId = req.body.projectId;
    const updatedEnteredBy = req.body.enteredBy;
    const updatedEntryDate = req.body.entryDate;
    const updatedOopAmt = req.body.oopAmt;
    const updatedOopMemo = req.body.oopMemo;;
    const updatedTradeId = req.body.tradeId;
    const userName = req.user.ename;

    try {
        const oop = await Ownero.findByPk(oopId)

        oop.enteredBy = updatedEnteredBy;
        oop.entryDate = updatedEntryDate;
        oop.oopAmt = updatedOopAmt;
        oop.oopMemo = updatedOopMemo;
        oop.tradeId = updatedTradeId;
        await oop.save();

        const trades = await Trades.findAll()
        const ownero = await Ownero.findAll({
            where: { projectId: projId },
            include: [{
                model: Trades
            }]
        })
        const tots = await Ownero.sum('oopAmt', { where: { projectId: projId } })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Ownero
            }]
        })
        project.totalOwnero = tots;
        project.save();
        res.render('projects/ownero', {
            pageTitle: "Owner Out of Pocket",
            path: '/ownero',
            project: project,
            projId: projId,
            trade: trades,
            userName: userName,
            oops: ownero
        });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.getFrEdit = async(req, res, next) => {
    const frId = req.params.frId;
    const userName = req.user.ename;

    try {
        const trades = await Trades.findAll()
        const fr = await Fundsrcvd.findByPk(frId)
        const project = await Project.findByPk(fr.projectId)
        res.render('projects/frEdit', {
            pageTitle: "Edit Funds Received Line Item",
            path: '/frEdit',
            frId: frId,
            userName: userName,
            project: project,
            trade: trades,
            funds: fr
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postFrEdit = async(req, res, next) => {
    const frId = req.body.frId
    const projId = req.body.projectId;
    const updatedEnteredBy = req.body.enteredBy;
    const updatedEntryDate = req.body.entryDate;
    const updatedFundsAmt = req.body.fundsAmt;
    const updatedFundsDescription = req.body.fundsDescription;
    const userName = req.user.ename;
    const userId = req.user.id;

    try {
        const fr = await Fundsrcvd.findByPk(frId)

        fr.enteredBy = updatedEnteredBy;
        fr.entryDate = updatedEntryDate;
        fr.fundsAmt = updatedFundsAmt;
        fr.fundsDescription = updatedFundsDescription;

        await fr.save();

        const fundsrcvd = await Fundsrcvd.findAll({
            where: { projectId: projId }
        })
        const tots = await Fundsrcvd.sum('fundsAmt', { where: { projectId: projId } })

        const project = await Project.findByPk(projId, {
            include: [{
                model: Fundsrcvd
            }]
        })
        project.totalFundsReceived = tots;
        project.save();
        res.render('projects/fundsReceived', {
            pageTitle: "Funds Received",
            path: '/fundsReceived',
            project: project,
            projId: projId,
            userName: userName,
            userId: userId,
            fR: fundsrcvd,
            totals: tots
        });


    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.getJcEdit = async(req, res, next) => {
    const jcId = req.params.jcId;
    const userName = req.user.ename;
    const userId = req.user.id;

    try {
        const trades = await Trades.findAll()
        const jc = await Jobcosts.findByPk(jcId, {
            include: [{
                model: Trades
            }]
        })
        const project = await Project.findByPk(jc.projectId)
        res.render('projects/jcEdit', {
            pageTitle: "Edit Job Cost Line Item",
            path: '/jcEdit',
            jcId: jcId,
            userName: userName,
            userId: userId,
            project: project,
            trade: trades,
            jc: jc
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postJcEdit = async(req, res, next) => {
    const jcId = req.body.jcId
    const projId = req.body.projectId;
    const updatedEnteredBy = req.body.enteredBy;
    const updatedEntryDate = req.body.entryDate;
    const updatedCostAmt = req.body.costAmt;
    const updatedCostMemo = req.body.costMemo;;
    const updatedTradeId = req.body.tradeId;
    const userName = req.user.ename;
    const userId = req.user.id;

    try {
        const jc = await Jobcosts.findByPk(jcId)

        jc.enteredBy = updatedEnteredBy;
        jc.entryDate = updatedEntryDate;
        jc.costAmt = updatedCostAmt;
        jc.costMemo = updatedCostMemo;
        jc.tradeId = updatedTradeId;
        await jc.save();

        const trades = await Trades.findAll()
        const jobcosts = await Jobcosts.findAll({
            where: { projectId: projId },
            include: [{
                model: Trades
            }]
        })
        const tots = await Jobcosts.sum('costAmt', { where: { projectId: projId } })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Jobcosts
            }, {
                model: Trades
            }]
        })
        project.totalJobCosts = tots;
        project.save();
        res.render('projects/JobCosts', {
            pageTitle: "Job Costs",
            path: '/JobCosts',
            project: project,
            projId: projId,
            trade: trades,
            userName: userName,
            userId: userId,
            jC: Jobcosts,
            totals: tots
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getComEdit = async(req, res, next) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;

    try {
        const reppay = await Reppay.findAll({ where: { projectId: projId } })
        const project = await Project.findByPk(projId)
        res.render('projects/comEdit', {
            pageTitle: "Commissions Page",
            path: '/comEdit',
            project: project,
            pays: reppay
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postComEdit = async(req, res, next) => {
    const projId = req.params.projectId;
    try {
        const project = await Project.findByPk(projId)

        res.redirect('/home');

    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.getComEditC = async(req, res, next) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;

    try {
        const reppay = await Reppay.findAll({ where: { projectId: projId } })
        const project = await Project.findByPk(projId)
        res.render('projects/comEditC', {
            pageTitle: "Commissions Page",
            path: '/comEditC',
            project: project,
            pays: reppay
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postComEditC = async(req, res, next) => {
    const projId = req.params.projectId;
    try {
        const project = await Project.findByPk(projId)

        res.redirect('/home');

    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.getRepPay = async(req, res, nexct) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;
    const userId = req.user.id;

    try {
        const reppay = await Reppay.findAll({
            where: { projectId: projId }
        })
        const tots = await Reppay.sum('payAmt', { where: { projectId: projId } })
        const project = await Project.findByPk(projId)

        project.totalRepPay = tots;
        await project.save();
        res.render('projects/repPay', {
            pageTitle: "Sales Rep Payments",
            path: '/repPay',
            project: project,
            projId: projId,
            pays: reppay,
            userName: userName,
            userId: userId,
            totals: tots
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.postRepPay = (req, res, next) => {

    Reppay.create({
            enteredBy: req.body.enteredBy,
            projectId: req.body.projectId,
            entryDate: req.body.entryDate,
            payAmt: req.body.payAmt,
            description: req.body.description
        })
        .then(reppay => {
            res.redirect('back');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getRpEdit = async(req, res, next) => {
    const rpId = req.params.rpId;
    const userName = req.user.ename;

    try {
        const rp = await Reppay.findByPk(rpId)

        const project = await Project.findByPk(rp.projectId)
        res.render('projects/rpEdit', {
            pageTitle: "Edit Sales Rep Payment",
            path: '/rpEdit',
            rpId: rpId,
            userName: userName,
            project: project,
            pays: rp
        });

    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postRpEdit = async(req, res, next) => {
    const rpId = req.body.rpId
    const projId = req.body.projectId;
    const updatedEnteredBy = req.body.enteredBy;
    const updatedEntryDate = req.body.entryDate;
    const updatedPayAmt = req.body.payAmt;
    const updatedDescription = req.body.description;
    const userName = req.user.ename;
    const userId = req.user.id;

    try {
        const rp = await Reppay.findByPk(rpId)

        rp.enteredBy = updatedEnteredBy;
        rp.entryDate = updatedEntryDate;
        rp.payAmt = updatedPayAmt;
        rp.description = updatedDescription;

        await rp.save();

        const reppay = await Reppay.findAll({
            where: { projectId: projId }
        })
        const tots = await Reppay.sum('payAmt', { where: { projectId: projId } })

        const project = await Project.findByPk(projId)
        project.totalRepPay = tots;
        project.save();
        res.render('projects/repPay', {
            pageTitle: "Payments to Sales Reps",
            path: '/repPay',
            project: project,
            projId: projId,
            userName: userName,
            userId: userId,
            pays: reppay,
            totals: tots
        });


    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.getStatChg = async(req, res, next) => {
    const projId = req.params.projectId;
    const statId = req.params.statusId;
    const statName = req.params.statusName;
    let msg = '';
    if (statId == 1) {
        msg = "Entry is for projects that do not have paperwork, or funds recieved sufficient to start Estimating. Putting a project 'BACK' into Entry should be a very VERY rare occurance";
    } else {
        if (statId == 2) {
            msg = "Please make sure that paperwork is attached and funds have been received sufficient to allow estimating to start work. Also confirm that the project number is not ST signifying that Accounting has entered this project ino their software module.";
        } else {
            if (statId == 3) {
                msg = "To move into Production, Estimating must be substantially complete."
            } else {
                if (statId == 4) {
                    msg = "To move into Awaiting Inspection, all other scope work MUST be completed.";
                } else {
                    if (statId == 5) {
                        msg = "To move into Close-Out, estimating must be completed, all scope work MUST be completed and all final inspections have been passed.";
                    } else {
                        if (statId == 6) {
                            msg = "To move into Completed, estimating must be completed, all scope work MUST be completed, all final inspections have been passed and all Funds Due have been received.";
                        } else {
                            if (statId == 7) {
                                msg = "Only move a project into Collections once a collection method or company has been decided upon.";
                            } else {
                                if (statId == 8) {
                                    msg = "A project is Canceled if the Owner cancels the contract, or if CJ cancels it. If the insurance company does not buy the roof, or enough trades that the deciscion is made not to go forward, then place the project into Denied not canceled.";
                                } else {
                                    if (statId == 9) {
                                        msg = "A project is Denied if the insurance company does not buy the roof, or enough trades that the deciscion is made not to go forward. If the Owner cancels the contract, or if CJ cancels it, then place the project into Canceled ";
                                    } else {
                                        if (statId == 10) {
                                            msg = "A project is placed in hold ONLY when it is anticipated that the project will go forward, but not immediately.";
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    try {
        const project = await Project.findOne({ where: { id: projId }, include: [{ model: Status }] })

        res.render('projects/statusChg', {
            pageTitle: "Status Change",
            path: '/statusChg',
            projId: projId,
            project: project,
            statId: statId,
            msg: msg,
            statName: statName
        });

    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postStatChg = async(req, res, next) => {
    const projId = req.body.projectId;
    const statId = req.body.statusId;
    const uemail = req.user.email;
    console.log(uemail);
    try {

        const projChg = await Project.findOne({ where: { id: projId } })
        projChg.statusId = statId;
        await projChg.save();

        const notes = await Notes.findAll({
            where: { projectId: projId },
            order: [
                ['entryDate', 'DESC']
            ]
        })
        const project = await Project.findOne({
            where: { id: projId },
            include: [{
                model: Sales
            }, {
                model: Supervisor
            }, {
                model: Status
            }, {
                model: Insurance
            }]
        })
        const stName = project.status.status;
        const sp = project.sale.email;
        const Subj = "The project located at " + project.address + " has been moved to: " + stName;
        await sgMail.send({
            to: sp,
            cc: ['todd@cjrestoration.com', 'heather@cjrestoration.com', 'joey@cjrestoration.com', 'kevin@cjrestoration.com'],
            from: uemail,
            subject: Subj,
            text: Subj,
            html: Subj,
        });
        res.render('projects/project', {
            project: project,
            note: notes,
            pageTitle: project.projectNo,
            path: '/project',
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};
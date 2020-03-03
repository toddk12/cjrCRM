const Sequelize = require('sequelize');
const Project = require('../models/project');
const Status = require('../models/status');
const Insurance = require('../models/insurance');
const Supervisor = require('../models/supervisor');
const Sales = require('../models/sales');
const Document = require('../models/document');
const Notes = require('../models/notes');
const Additions = require('../models/additions');
const FundsRcvd = require('../models/fundsRcvd');
const Exclusions = require('../models/exclusions');
const OwnerOop = require('../models/ownerOop');
const JobCosts = require('../models/jobCosts');
const Trades = require('../models/trades');
const RType = require('../models/rType');
const Wtb = require('../models/wtb');

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
        res.render('projects/project', {
            project: project,
            note: notes,
            pageTitle: project.projectNo,
            path: '/project',
        });
    } catch (err) {
        const error = new Error(err);
        console.log(error);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getIndex = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.render('index', {
            pageTitle: 'CJ Restoration',
            path: '/',
        });
    })
};

exports.postDeleteProject = (req, res, next) => {
    const projId = req.body.projectId;
    Project.findByPk(projId)
        .then(project => {
            return project.destroy();
        })
        .then(result => {
            console.log('Deleted Project');
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
    console.log("Yup going here!!!");
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
    console.log(updatedInsuranceId);
    console.log(updatedPolicyNo);
    console.log(updatedClaimNo);
    console.log(updatedDateLoss);
    console.log(updatedTypeLoss);
    console.log(updatedDeductible);
    console.log(updatedOScopeDate);
    console.log(updatedOScopeRCV);
    console.log(updatedFScopeDate);
    console.log(updatedFScopeRCV);
    console.log(updatedAdjName);
    console.log(updatedAdjPhone);
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

exports.getDocInfo = (req, res, next) => {
    const projId = req.params.projectId;
    Document.findAll({
            where: { projectId: projId }
        })
        .then(document => {
            Project.findByPk(projId)
                .then(project => {
                    res.render('projects/docInfo', {
                        pageTitle: "Documents",
                        path: '/docInfo',
                        project: project,
                        docs: document,
                        projId: projId
                    });
                })
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getDocAdd = (req, res, next) => {
    const projId = req.params.projectId;
    RType.findAll()
        .then(rType => {
            Document.findByPk(projId)
                .then(document => {
                    Project.findByPk(projId)
                        .then(project => {
                            res.render('projects/docAdd', {
                                pageTitle: "Add Document",
                                path: '/docAdd',
                                project: project,
                                docs: document,
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

exports.postDocAdd = (req, res, next) => {
    console.log(req.body.projectId);
    console.log(req.file.originalname);
    console.log(req.body.docName);
    Document.create({
            projectId: req.body.projectId,
            docFile: req.file.originalname,
            docName: req.body.docName
        })
        .then(document => {
            res.redirect('back');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getDocEdit = (req, res, next) => {
    const projId = req.params.projectId;
    console.log("getDocInfo");
    RType.findAll()
        .then(rType => {
            Document.findByPk(projId)
                .then(document => {
                    Project.findByPk(projId)
                        .then(project => {
                            res.render('projects/docEdit', {
                                pageTitle: "Edit Document",
                                path: '/docEdit',
                                project: project,
                                docs: document,
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

exports.postDocEdit = (req, res, next) => {
    const newProjId = (req.body.projectId);
    const newDocName = (req.body.docName);
    const newDocFile = (req.file);
    console.log(newProjId);
    console.log(newDocName);
    console.log(newDocFile);

};

exports.postChangeStatus2 = (req, res, next) => {
    let projId = req.params.projId;
    let updatedStatus = req.body.newStat;
    let changedBy = req.user.id;
    console.log(updatedStatus);
    console.log(changedBy);
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
            console.log('Status Change Failed!.');
        });
};

exports.getFundsReceived = async(req, res, nexct) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;
    const userId = req.user.id;
    try {
        const fundsRcvd = await FundsRcvd.findAll({
            where: { projectId: projId }
        })
        const allfunds = fundsRcvd;
        let tots = 0;
        for (a of allfunds) {
            tots += a.fundsAmt;
        };
        console.log(tots);
        const project = await Project.findByPk(projId, {
            include: [{
                model: FundsRcvd
            }]
        })
        project.totalFundsRcvd = tots;
        project.save();
        res.render('projects/fundsReceived', {
            pageTitle: "Funds Received",
            path: '/fundsReceived',
            project: project,
            projId: projId,
            userName: userName,
            userId: userId,
            fR: fundsRcvd,
            totals: tots
        });
    } catch (err) {
        console.log(fundsRcvd);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.postFundsReceived = (req, res, next) => {

    FundsRcvd.create({
            enteredBy: req.body.enteredBy,
            projectId: req.body.projectId,
            entryDate: req.body.entryDate,
            fundsAmt: req.body.fundsAmt,
            fundsDescription: req.body.fundsDescription
        })
        // .then(funds => {
        //     Project.findByPk(projId, {
        //             include: [{
        //                 model: FundsRcvd
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
        const jobCosts = await JobCosts.findAll({
            where: { projectId: projId }
        })
        const allCosts = jobCosts;
        let tots = 0;
        for (a of allCosts) {
            tots += a.costAmt;
        };
        const project = await Project.findByPk(projId, {
            include: [{
                model: JobCosts
            }]
        })
        project.totalJobCosts = tots;
        project.save();
        res.render('projects/jobCosts', {
            pageTitle: "Job Costs",
            path: '/jobCosts',
            project: project,
            projId: projId,
            trade: trades,
            userName: userName,
            userId: userId,
            jC: jobCosts,
            totals: tots
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postJobCosts = (req, res, next) => {

    JobCosts.create({
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
    const userId = req.user.id;
    try {
        const trades = await Trades.findAll()
        const additions = await Additions.findAll({
            where: { projectId: projId }
        })
        const allAdds = additions;
        let tots = 0;
        for (a of allAdds) {
            tots += a.addAmt;
        };
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
            userId: userId,
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
            where: { projectId: projId }
        })
        const allExcl = exclusions;
        let tots = 0;
        for (a of allExcl) {
            tots += a.exclAmt;
        };
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

exports.getOwnerOop = async(req, res, next) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;
    const userId = req.user.id;
    try {
        const trades = await Trades.findAll()
        const ownerOop = await OwnerOop.findAll({
            where: { projectId: projId }
        })
        const allOop = ownerOop;
        let tots = 0;
        for (a of allOop) {
            tots += a.oopAmt;
        };
        const project = await Project.findByPk(projId, {
            include: [{
                model: OwnerOop
            }]
        })
        project.totalOwnerOop = tots;
        project.save();
        res.render('projects/ownerOop', {
            pageTitle: "Owner Out of Pocket",
            path: '/ownerOop',
            project: project,
            projId: projId,
            trade: trades,
            userName: userName,
            userId: userId,
            oops: ownerOop
        });
    } catch (err) {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    };
};

exports.postOwnerOop = (req, res, next) => {

    OwnerOop.create({
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
    console.log("TaTa");
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
        const exclTot = await Exclusions.sum('exclAmt', { where: { projectId: projId } })
        const ownerOop = await OwnerOop.findAll({ where: { projectId: projId }, include: [{ model: Trades }] })
        const oop1 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 1 } })
        const oop2 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 2 } })
        const oop3 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 3 } })
        const oop4 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 4 } })
        const oop5 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 5 } })
        const oop6 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 6 } })
        const oop7 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 7 } })
        const oop8 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 8 } })
        const oop9 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 9 } })
        const oop10 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 10 } })
        const oop11 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 11 } })
        const oop12 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 12 } })
        const oop13 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 13 } })
        const oop14 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 14 } })
        const oop15 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 15 } })
        const oop16 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 16 } })
        const oop17 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 17 } })
        const oop18 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 18 } })
        const oop19 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 19 } })
        const oop20 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 20 } })
        const oop21 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 21 } })
        const oop22 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 22 } })
        const oop23 = await OwnerOop.sum('oopAmt', { where: { projectId: projId, tradeId: 23 } })
        const oopTot = await OwnerOop.sum('oopAmt', { where: { projectId: projId } })
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
        const adjTot = (addTot - exclTot + oopTot)
        const jobCosts = await JobCosts.findAll({ where: { projectId: projId }, include: [{ model: Trades }] })
        const jc1 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 1 } })
        const jc2 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 2 } })
        const jc3 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 3 } })
        const jc4 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 4 } })
        const jc5 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 5 } })
        const jc6 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 6 } })
        const jc7 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 7 } })
        const jc8 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 8 } })
        const jc9 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 9 } })
        const jc10 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 10 } })
        const jc11 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 11 } })
        const jc12 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 12 } })
        const jc13 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 13 } })
        const jc14 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 14 } })
        const jc15 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 15 } })
        const jc16 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 16 } })
        const jc17 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 17 } })
        const jc18 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 18 } })
        const jc19 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 19 } })
        const jc20 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 20 } })
        const jc21 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 21 } })
        const jc22 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 22 } })
        const jc23 = await JobCosts.sum('costAmt', { where: { projectId: projId, tradeId: 23 } })
        const jcTot = await JobCosts.sum('costAmt', { where: { projectId: projId } })
        const project = await Project.findByPk(projId)
        console.log(net1);
        console.log(jc1);
        res.render('projects/wtbTot', {
            pageTitle: "Budget By Trade",
            path: '/wtbTot',
            project: project,
            projId: projId,
            // trade: trades,
            wtbs: wtb,
            adds: additions,
            excls: exclusions,
            ownerOop: ownerOop,
            jobCosts: jobCosts,
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
    const wtbId = req.body.wtbId;
    const updatedTradeId = req.body.tradeId;
    const updatedLine = req.body.line;
    const updatedRcv = req.body.rcv;
    const updatedOp = req.body.op;
    const updatedNet = (updatedRcv - updatedOp);
    try {
        const wtb = await Wtb.findByPk(wtbId, {
            include: [{
                model: Trades
            }, {
                model: Project
            }]
        })
        wtb.tradeId = updatedTradeId;
        wtb.line = updatedLine;
        wtb.rcv = updatedRcv;
        wtb.tradeId = updatedOp;
        wtb.op = updatedNet;
        wtb.save();
        res.redirect('back');
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
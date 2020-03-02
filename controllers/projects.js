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
            tradeName: req.body.tradeName
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
            tradeName: req.body.tradeName,
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
            tradeName: req.body.tradeName,
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
            tradeName: req.body.tradeName,
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
    console.log("Goodbye");
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
    console.log(projId);
    console.log(tradeId);
    console.log(line);
    console.log(rcv);
    console.log(op);
    console.log(net);

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
        const project = await Project.findByPk(projId)
        console.log(net1);
        console.log(net2);
        res.render('projects/wtbTot', {
            pageTitle: "Budget By Trade",
            path: '/wtbTot',
            project: project,
            projId: projId,
            // trade: trades,
            wtbs: wtb,
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
            net23: net23
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
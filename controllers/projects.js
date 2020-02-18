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


exports.getAddProject = (req, res, next) => {
    Sales.findAll()
        .then(sales => {
            Insurance.findAll()
                .then(insurance => {
                    Supervisor.findAll()
                        .then(supervisor => {
                            Status.findAll()
                                .then(status => {
                                    Additions.findAll()
                                        .then(additions => {
                                            Project.findAll()
                                                .then(project => {
                                                    res.render('projects/add-project', {
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
    Sales.findAll()
        .then(sales => {
            Insurance.findAll()
                .then(insurance => {
                    Supervisor.findAll()
                        .then(supervisor => {
                            Status.findAll()
                                .then(status => {
                                    Project.findAll()
                                        .then(project => {
                                            res.render('projects/add-c-project', {
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
            oCoName: req.body.oCoName,
            oContact: req.body.oContact,
            oAddress: req.body.oAddress,
            oCity: req.body.oCity,
            oState: req.body.oState,
            oZip: req.body.oZip,
            oPhone1: req.body.oPhone1,
            oPhone2: req.body.oPhone2,
            oEmail: req.body.oEmail,
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
            }]
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
        const notes = await Notes.findAll({ where: { projectId: projId } })
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
    const updatedbName = req.body.bName;
    const updatedbAddress = req.body.bAddress;
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
    const updatedoCoName = req.body.oCoName;
    const updatedoContact = req.body.oContact;
    const updatedoAddress = req.body.oAddress;
    const updatedoCity = req.body.oCity;
    const updatedoState = req.body.oState;
    const updatedoZip = req.body.oZip;
    const updatedoPhon1 = req.body.oPhon1;
    const updatedoPhone2 = req.body.oPhone2;
    const updatedoEmail = req.body.oEmail;
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
            project.oCoName = updatedoCoName;
            project.oContact = updatedoContact;
            project.oAddress = updatedoAddress;
            project.oCity = updatedoCity;
            project.oState = updatedoState;
            project.oZip = updatedoZip;
            project.oPhon1 = updatedoPhon1;
            project.oPhone2 = updatedoPhone2;
            project.oEmail = updatedoEmail;
            project.pmCoName = updatedpmCoName;
            project.pmContact = updatedpmContact;
            project.pmAddress = updatedpmAddress;
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
        const sales = await Sales.findAll()
        const supervisor = await Supervisor.findAll()
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

exports.getAddInsurance = async(req, res, next) => {
    try {
        const insurance = await Insurance.findAll()
        res.render('projects/add-insurance', {
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
            email2: req.body.cPhone,
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

exports.getInsuranceInfo = async(req, res, next) => {
    const projId = req.params.projectId;
    try {
        const insurance = await Insurance.findAll()
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
    const CA = Document.findByPk(projId, { where: { docName: "Contingency Agreement" } });
    console.log(CA);
    Document.findByPk(projId)
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

exports.postDocInfo = (req, res, next) => {
    const newProjId = (req.body.projectId);
    const newDocName = (req.body.docName);
    const newDocFile = (req.file);
    console.log(newProjId);
    console.log(newDocName);
    console.log(newDocFile);

};

exports.getDocAdd = (req, res, next) => {
    const projId = req.params.projectId;
    console.log("getDocInfo");
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
    const newProjId = (req.body.projectId);
    const newDocName = (req.body.docName);
    const newDocFile = (req.file);
    console.log(newProjId);
    console.log(newDocName);
    console.log(newDocFile);

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

exports.getAddNote = async(req, res, next) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;
    const userId = req.user.id;
    try {
        const notes = await Notes.findAll({
            where: { projectId: projId }
        })
        const project = await Project.findByPk(projId, {
            include: [{
                model: Notes
            }]
        })
        res.render('projects/add-note', {
            pageTitle: project.projectNo,
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

exports.getFundsReceived = async(req, res, nexct) => {
    const projId = req.params.projectId;
    const userName = req.user.ename;
    const userId = req.user.id;
    try {
        const fundsRcvd = await FundsRcvd.findAll({ where: { projectId: projId } })
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
        const jobCosts = await JobCosts.findAll({ where: { projectId: projId } })
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
        project.ownerOop = tots;
        project.save();
        res.render('projects/ownerOop', {
            pageTitle: "Owner Out of Pocket",
            path: '/ownerOop',
            project: project,
            projId: projId,
            trade: trades,
            userName: userName,
            userId: userId,
            oops: ownerOop,
            totals: tots
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
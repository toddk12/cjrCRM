const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');

const Project = require('../models/project');
const Status = require('../models/status');
const Insurance = require('../models/insurance');
const Supervisor = require('../models/supervisor');
const Sales = require('../models/sales');


exports.getSearchLn = async(req, res, next) => {

    res.render('search/searchLn', {
        pageTitle: 'Last Name Search',
        path: '/searchLn',
    });

};

exports.postSearchLn = async(req, res, next) => {
    const o1Ln = req.body.o1Ln;
    try {
        const sales = await Sales.findAll()
        const status = await Status.findAll()
        const projects = await Project.findAll({
            where: {
                owner1Ln: {
                    [Op.substring]: o1Ln
                }
            },
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

exports.getSearchBn = async(req, res, next) => {

    res.render('search/searchBn', {
        pageTitle: 'Building Name Search',
        path: '/searchBn',
    });

};

exports.postSearchBn = async(req, res, next) => {
    const bN = req.body.bN;
    try {
        const sales = await Sales.findAll()
        const status = await Status.findAll()
        const projects = await Project.findAll({
            where: {
                bName: {
                    [Op.substring]: bN
                }
            },
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

exports.getSearchAdd = async(req, res, next) => {

    res.render('search/searchAdd', {
        pageTitle: 'Address Search',
        path: '/searchAdd',
    });

};

exports.postSearchAdd = async(req, res, next) => {
    const add = req.body.add;
    const com = req.body.com;
    try {
        if (!com) {
            const sales = await Sales.findAll()
            const status = await Status.findAll()
            const projects = await Project.findAll({
                where: {
                    address: {
                        [Op.substring]: add
                    }
                },
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
        } else {
            const sales = await Sales.findAll()
            const status = await Status.findAll()
            const projects = await Project.findAll({
                where: {
                    bAddress: {
                        [Op.substring]: add
                    }
                },
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
        }
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }

};

exports.getSearchCty = async(req, res, next) => {

    res.render('search/searchCty', {
        pageTitle: 'City Search',
        path: '/searchCty',
    });

};

exports.postSearchCty = async(req, res, next) => {
    const city = req.body.city;
    const com = req.body.com;
    try {
        if (!com) {
            const sales = await Sales.findAll()
            const status = await Status.findAll()
            const projects = await Project.findAll({
                where: {
                    city: {
                        [Op.substring]: city
                    }
                },
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
        } else {
            const sales = await Sales.findAll()
            const status = await Status.findAll()
            const projects = await Project.findAll({
                where: {
                    bCity: {
                        [Op.substring]: city
                    }
                },
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
        }
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }

};
const fs = require('fs');
const path = require('path');
const fileHelper = require('../util/delete');
const moment = require('moment');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const express = require('express');

const upload = require('../services/file-upload');

const singleUpload = upload.single('docFile');

const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const Project = require('../models/project');
const Document = require('../models/document');
const Rtype = require('../models/rtype');

exports.getAddDoc = async(req, res, next) => {
    const projId = req.params.projectId;

    try {
        const rtype = await Rtype.findAll()
        const document = await Document.findAll({ where: { projectId: projId } })
        const project = await Project.findByPk(projId)
            // console.log(rtype);
            // res.redirect("back");
        res.render('doc/add-doc', {
            pageTitle: "Add Document",
            path: '/add-doc',
            project: project,
            doc: document,
            projId: projId,
            types: rtype
        });

    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }

};

exports.postAddDoc = async(req, res) => {
    // const projId = req.body.projectId;
    // const docName = req.body.docName;
    // const docFile = req.file.originalname;
    // const docPath = req.file.filename;
    //     console.log(docFile);

        singleUpload(req, res, function(err) {
            return res.json({ 'fileUrl': req.file.location });
        });
    };


//     try {
//         // uploadS3.single('docFile'), (req, res) => {
//         //     console.log(docFile);
//         // };
//         res.redirect('home');
//         // const docs = await Document.create({
//         //     projectId: projId,
//         //     docName: docName,
//         //     docFile: docFile,
//         //     docPath: docPath
//         // })

//         // const rtype = await Rtype.findAll()
//         // const document = await Document.findAll({
//         //     where: { projectId: projId }
//         // })
//         // const project = await Project.findByPk(projId)
//         // res.render('doc/add-doc', {
//         //     pageTitle: "Add Document",
//         //     path: '/add-doc',
//         //     project: project,
//         //     doc: document,
//         //     projId: projId,
//         //     types: rtype
//         // });
//     } catch (err) {
//         const error = new Error(err);
//         error.httpStatusCode = 500;
//         return next(error);
//     }
// };

// exports.postAddDoc = async(req, res, next) => {
//     const projId = req.body.projectId;
//     const docName = req.body.docName;
//     const docFile = req.file.originalname;
//     const docPath = req.file.filename;

//     try {

//         const docs = await Document.create({
//             projectId: projId,
//             docName: docName,
//             docFile: docFile,
//             docPath: docPath
//         })

//         const rtype = await Rtype.findAll()
//         const document = await Document.findAll({
//             where: { projectId: projId }
//         })
//         const project = await Project.findByPk(projId)
//         res.render('doc/add-doc', {
//             pageTitle: "Add Document",
//             path: '/add-doc',
//             project: project,
//             doc: document,
//             projId: projId,
//             types: rtype
//         });
//     } catch (err) {
//         const error = new Error(err);
//         error.httpStatusCode = 500;
//         return next(error);
//     }

// };

exports.getDownloadDoc = async(req, res, next) => {
    const docId = req.params.docId;
    try {
        const document = await Document.findByPk(docId)
        const filePath = path.join('public', 'documents', document.docPath);
        const docFile = document.docFile;
        fs.readFile(filePath, (err, data) => {
            if (err) {
                return next(err);
            }
            res.setHeader('Content-Disposition', 'attachment; filename="' + docFile + '"');
            res.send(data);
        })
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }

};

exports.getDeleteDoc = async(req, res, next) => {
    const docId = req.params.docId;
    try {
        const document = await Document.findByPk(docId)
        const projId = document.projectId;
        const filePath = path.join('public', 'documents', document.docPath);

        fileHelper.deleteFile(filePath);
        document.destroy()
        await document.save();
        Rtype.findAll()
            .then(rtype => {
                Document.findAll({
                        where: { projectId: projId }
                    })
                    .then(document => {
                        Project.findByPk(projId)
                            .then(project => {
                                res.render('doc/add-doc', {
                                    pageTitle: "Add Document",
                                    path: '/add-doc',
                                    project: project,
                                    doc: document,
                                    projId: projId,
                                    types: rtype
                                });
                            })
                    })
            });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }

};
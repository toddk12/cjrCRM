const Sequelize = require('sequelize');
const { Op } = require('sequelize');

const fs = require('fs');
const path = require('path');

const PDFDocument = require('pdfkit');

const Project = require('../models/project');
const Status = require('../models/status');
const Insurance = require('../models/insurance');
const Supervisor = require('../models/supervisor');
const Subcontractor = require('../models/subcontractor');
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
const WorkOrder = require('../models/workOrder');
const RoofCalc = require('../models/roofCalc');

exports.getRoofCalc = async(req, res, next) => {

    const projId = req.params.projectId;

    try {
        const roofCheck = await RoofCalc.count({
            where: { projectId: projId }
        })
        const roofCalc = await RoofCalc.findOne({
            where: { projectId: projId },
            include: [{
                model: Project
            }]
        })
        const pid = roofCheck;

        if (pid === 0) {

            const project = await Project.findByPk(projId)
            res.render('roof/roofCalc', {
                pageTitle: 'Roof Calculator',
                path: '/roofCalc',
                projId: projId,
                roof: roofCalc,
                project: project
            });
        } else {
            const roofId = roofCalc.id;

            res.render('roof/roofOrder', {
                pageTitle: 'Roof Order',
                path: '/roofOrder',
                roofId: roofId,
                roof: roofCalc
            });
        }

    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postRoofCalc = (req, res, next) => {
    let sq = parseInt(req.body.squares, 10);
    let rid = parseInt(req.body.ridge, 10);
    let hp = parseInt(req.body.hip, 10);

    let es = parseInt(req.body.eaveStarter, 10);
    let rk = parseInt(req.body.rake, 10);
    let noi = parseInt(req.body.noIWCourses, 10);
    let vy = parseInt(req.body.valley, 10);
    let fl = parseInt(req.body.flashing, 10);
    let sf = parseInt(req.body.stepFlashing, 10);
    let ta = parseInt(req.body.totalArea, 10);
    let shingles = Math.ceil((sq + 1));
    let hipRidge = Math.ceil(((rid + hp) / 28) + 1);
    let starter = Math.ceil(((es + rk) / 100) + 1);
    let drip24 = Math.ceil(((es / 10) + 1));
    let drip = Math.ceil(((rk / 10) + 1));
    let fw = req.body.feltWgt;
    var felt = 0;
    let nd = req.body.needDeck;
    var deck = 0;
    if (fw === "15 lbs") {
        felt = Math.ceil(((sq / 4) + 1));
    } else {
        felt = Math.ceil(((sq / 2) + 1));
    };
    let iceWater = Math.ceil((((es * noi) / 66) + (vy / 66) + 1));
    let lFlash = Math.ceil(((fl / 10) + 1));
    let sFlash = Math.ceil(((sf / 45) + 1));
    let cNail = Math.ceil(((sq / 16) + 1));
    let pNail = Math.ceil(((sq / 25) + 1));
    if (nd === "Yes") {
        deck = Math.ceil(((ta / 32) + 1));
    } else {
        deck = 0;
    };


    RoofCalc.create({
            adjPipeVents: req.body.adjPipeVents,
            bVent: req.body.bvent,
            bvSize: req.body.bvSize,
            caulk: req.body.caulk,
            cNail: cNail,
            deck: deck,
            desc1: req.body.desc1,
            desc2: req.body.desc2,
            desc3: req.body.desc3,
            desc4: req.body.desc4,
            drip24: drip24,
            dripColor: req.body.dripColor,
            dripEdge: drip,
            dripSize: req.body.dripSize,
            eaveStarter: req.body.eaveStarter,
            felt: felt,
            feltWgt: req.body.feltWgt,
            flashing: req.body.flashing,
            hip: req.body.hip,
            hipRidge: hipRidge,
            iceWater: iceWater,
            lFlash: lFlash,
            modBase: req.body.modBase,
            needDeck: req.body.needDeck,
            noIWCourses: req.body.noIWCourses,
            orderNotes: req.body.orderNotes,
            other1: req.body.other1,
            other2: req.body.other2,
            other3: req.body.other3,
            other4: req.body.other4,
            pNail: pNail,
            rake: req.body.rake,
            ridge: req.body.ridge,
            rollRoof: req.body.rollRoof,
            rollValley: req.body.rollValley,
            sColor: req.body.sColor,
            sFlash: sFlash,
            shingles: shingles,
            sManufacturer: req.body.sManufacturer,
            sMaterial: req.body.sMaterial,
            sName: req.body.sName,
            sprayPaint: req.body.sprayPaint,
            sprayPrimer: req.body.sprayPrimer,
            squares: req.body.squares,
            starter: starter,
            stepFlashing: req.body.stepFlashing,
            supplier: req.body.supplier,
            tinShingles: req.body.tinShingles,
            totalArea: req.body.totalArea,
            turtleColor: req.body.turtleColor,
            turtleVents: req.body.turtleVents,
            unit1: req.body.unit1,
            unit2: req.body.unit2,
            unit3: req.body.unit3,
            unit4: req.body.unit4,
            valley: req.body.valley,
            vcSize: req.body.vcSize,
            versaCaps: req.body.versaCaps,
            projectId: req.body.projectId
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

exports.getRoofOrder = async(req, res, next) => {

    const roofId = req.params.roofId;

    try {
        const roofCalc = await RoofCalc.findByPk(roofId, {
            include: [{
                model: Project
            }]
        })
        res.render('roof/roofOrder', {
            pageTitle: 'Roof Order',
            path: '/roofOrder',
            roofId: roofId,
            roof: roofCalc
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getRoofCalcEdit = async(req, res, next) => {

    const roofId = req.params.roofId;
    try {
        const roofCalc = await RoofCalc.findByPk(roofId, {
            include: [{
                model: Project
            }]
        })
        const projId = roofCalc.projectId;

        const project = await Project.findByPk(projId)
        res.render('roof/roofCalcEdit', {
            pageTitle: 'Edit Roof Calculator',
            path: '/roofCalcEdit',
            projId: projId,
            roof: roofCalc,
            project: project
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.postRoofCalcEdit = async(req, res, next) => {
    const roofId = req.body.roofId;
    let sq = parseInt(req.body.squares, 10);
    let rid = parseInt(req.body.ridge, 10);
    let hp = parseInt(req.body.hip, 10);
    let es = parseInt(req.body.eaveStarter, 10);
    let rk = parseInt(req.body.rake, 10);
    let noi = parseInt(req.body.noIWCourses, 10);
    let vy = parseInt(req.body.valley, 10);
    let fl = parseInt(req.body.flashing, 10);
    let sf = parseInt(req.body.stepFlashing, 10);
    let ta = parseInt(req.body.totalArea, 10);
    let shingles = Math.ceil((sq + 1));
    let hipRidge = Math.ceil(((rid + hp) / 28) + 1);
    let starter = Math.ceil(((es + rk) / 100) + 1);
    let drip24 = Math.ceil(((es / 10) + 1));
    let drip = Math.ceil(((rk / 10) + 1));
    let fw = req.body.feltWgt;
    var felt = 0;
    let nd = req.body.needDeck;
    var deck = 0;
    if (fw === "15 lbs") {
        felt = Math.ceil(((sq / 4) + 1));
    } else {
        felt = Math.ceil(((sq / 2) + 1));
    };
    let iceWater = Math.ceil((((es * noi) / 66) + (vy / 66) + 1));
    let lFlash = Math.ceil(((fl / 10) + 1));
    let sFlash = Math.ceil(((sf / 45) + 1));
    let cNail = Math.ceil(((sq / 16) + 1));
    let pNail = Math.ceil(((sq / 25) + 1));
    if (nd === "Yes") {
        deck = Math.ceil(((ta / 32) + 1));
    } else {
        deck = 0;
    };
    const updatedAdjPipeVents = req.body.adjPipeVents;
    const updatedBVent = req.body.bvent;
    const updatedBvSize = req.body.bvSize;
    const updatedCaulk = req.body.caulk;
    const updatedDesc1 = req.body.desc1;
    const updatedDesc2 = req.body.desc2;
    const updatedDesc3 = req.body.desc3;
    const updatedDesc4 = req.body.desc4;
    const updatedDripColor = req.body.dripColor;
    const updatedDripSize = req.body.dripSize;
    const updatedEaveStarter = req.body.eaveStarter;
    const updatedFeltWgt = req.body.feltWgt;
    const updatedFlashing = req.body.flashing;
    const updatedHip = req.body.hip;
    const updatedModBase = req.body.modBase;
    const updatedNeedDeck = req.body.needDeck;
    const updatedNoIWCourses = req.body.noIWCourses;
    const updatedOrderNotes = req.body.orderNotes;
    const updatedOther1 = req.body.other1;
    const updatedOther2 = req.body.other2;
    const updatedOther3 = req.body.other3;
    const updatedOther4 = req.body.other4;
    const updatedRake = req.body.rake;
    const updatedRidge = req.body.ridge;
    const updatedRollRoof = req.body.rollRoof;
    const updatedRollValley = req.body.rollValley;
    const updatedSColor = req.body.sColor;
    const updatedSManufacturer = req.body.sManufacturer;
    const updatedSMaterial = req.body.sMaterial;
    const updatedSName = req.body.sName;
    const updatedSprayPaint = req.body.sprayPaint;
    const updatedSprayPrimer = req.body.sprayPrimer;
    const updatedSquare = req.body.square;
    const updatedStepFlashing = req.body.stepFlashing;
    const updatedSupplier = req.body.supplier;
    const updatedTinShingles = req.body.tinShingles;
    const updatedTotalArea = req.body.totalArea;
    const updatedTurtleColor = req.body.turtleColor;
    const updatedTurtleVents = req.body.turtleVents;
    const updatedUnit1 = req.body.unit1;
    const updatedUnit2 = req.body.unit2;
    const updatedUnit3 = req.body.unit3;
    const updatedUnit4 = req.body.unit4;
    const updatedValley = req.body.valley;
    const updatedVcSize = req.body.vcSize;
    const updatedVersaCaps = req.body.versaCaps;


    try {
        const roofCalc = await RoofCalc.findByPk(roofId)

        roofCalc.adjPipeVents = updatedAdjPipeVents;
        roofCalc.bVent = updatedBVent;
        roofCalc.bvSize = updatedBvSize;
        roofCalc.caulk = updatedCaulk;
        roofCalc.cNail = cNail;
        roofCalc.deck = deck;
        roofCalc.desc1 = updatedDesc1;
        roofCalc.desc2 = updatedDesc2;
        roofCalc.desc3 = updatedDesc3;
        roofCalc.desc4 = updatedDesc4;
        roofCalc.drip24 = drip24;
        roofCalc.dripColor = updatedDripColor;
        roofCalc.dripEdge = drip;
        roofCalc.dripSize = updatedDripSize;
        roofCalc.eaveStarter = updatedEaveStarter;
        roofCalc.felt = felt;
        roofCalc.feltWgt = updatedFeltWgt;
        roofCalc.flashing = updatedFlashing;
        roofCalc.hip = updatedHip;
        roofCalc.hipRidge = hipRidge;
        roofCalc.iceWater = iceWater;
        roofCalc.lFlash = lFlash;
        roofCalc.modBase = updatedModBase;
        roofCalc.needDeck = updatedNeedDeck;
        roofCalc.noIWCourses = updatedNoIWCourses;
        roofCalc.orderNotes = updatedOrderNotes;
        roofCalc.other1 = updatedOther1;
        roofCalc.other2 = updatedOther2;
        roofCalc.other3 = updatedOther3;
        roofCalc.other4 = updatedOther4;
        roofCalc.pNail = pNail;
        roofCalc.rake = updatedRake;
        roofCalc.ridge = updatedRidge;
        roofCalc.rollRoof = updatedRollRoof;
        roofCalc.rollValley = updatedRollValley;
        roofCalc.sColor = updatedSColor;
        roofCalc.sFlash = sFlash;
        roofCalc.shingles = shingles;
        roofCalc.sManufacturer = updatedSManufacturer;
        roofCalc.sMaterial = updatedSMaterial;
        roofCalc.sName = updatedSName;
        roofCalc.sprayPaint = updatedSprayPaint;
        roofCalc.sprayPrimer = updatedSprayPrimer;
        roofCalc.squares = updatedSquare;
        roofCalc.starter = starter;
        roofCalc.stepFlashing = updatedStepFlashing;
        roofCalc.supplier = updatedSupplier;
        roofCalc.tinShingles = updatedTinShingles;
        roofCalc.totalArea = updatedTotalArea;
        roofCalc.turtleColor = updatedTurtleColor;
        roofCalc.turtleVents = updatedTurtleVents;
        roofCalc.unit1 = updatedUnit1;
        roofCalc.unit2 = updatedUnit2;
        roofCalc.unit3 = updatedUnit3;
        roofCalc.unit4 = updatedUnit4;
        roofCalc.valley = updatedValley;
        roofCalc.vcSize = updatedVcSize;
        roofCalc.versaCaps = updatedVersaCaps
        await roofCalc.save();

        const roofCal = await RoofCalc.findByPk(roofId, {
            include: [{
                model: Project
            }]
        })
        res.render('roof/roofOrder', {
            pageTitle: 'Roof Order',
            path: '/roofOrder',
            roofId: roofId,
            roof: roofCal
        });
    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};

exports.getROrder = async(req, res, next) => {
    const roofId = req.params.roofId;

    try {

        const roofCalc = await RoofCalc.findByPk(roofId, {
            include: [{
                model: Project
            }],
        })
        const project = await Project.findAll({
            where: { id: roofCalc.projectId }
        });

        const owner = (roofCalc.project.owner1Fn + " " + roofCalc.project.owner1Ln);
        const hPhone = ("(" + roofCalc.project.hPhone.substring(0, 3) + ") " + roofCalc.project.hPhone.substring(3, 6) + "-" + roofCalc.project.hPhone.substring(6, 10));
        const cPhone = ("(" + roofCalc.project.cPhone.substring(0, 3) + ") " + roofCalc.project.cPhone.substring(3, 6) + "-" + roofCalc.project.cPhone.substring(6, 10));
        const oPhone = ("(" + roofCalc.project.oPhone.substring(0, 3) + ") " + roofCalc.project.oPhone.substring(3, 6) + "-" + roofCalc.project.oPhone.substring(6, 10));
        const addr = (roofCalc.project.address);
        const csz = (roofCalc.project.city + ", " + roofCalc.project.state + " " + roofCalc.project.zip);
        const sMat = (roofCalc.sMaterial);
        const sManu = (roofCalc.sManufacturer);

        const rcName = 'roofOrders-' + roofId + '.pdf';
        const rcPath = path.join('data', 'roofOrders', rcName);

        const pdfDoc = new PDFDocument({
            margins: {
                top: 25,
                bottom: 25,
                left: 72,
                right: 72
            }
        });
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'inline; filename="' + rcName + '"');

        pdfDoc.pipe(fs.createWriteStream(rcPath));
        pdfDoc.pipe(res);
        pdfDoc.font('Times-Roman');
        pdfDoc.image('./public/images/logo.png', {
            fit: [150, 200],
            align: 'center'
        });
        pdfDoc.moveUp(4).fontSize(18).text('ROOF MATERIAL ORDER FORM', { indent: 150, align: 'center' });
        pdfDoc.font('Times-Bold').fontSize(10).text('12385 E. Cornell Ave, Aurora, CO 80014', { indent: 150, align: 'center' });
        pdfDoc.text(' Office (303) 690-9253 | Fax (303) 690-9945 ', { indent: 150, align: 'center' });
        pdfDoc.moveDown(2).fontSize(12).text('Property Owner: ');
        pdfDoc.moveUp().font('Times-Roman').text(owner, { indent: 100 });
        pdfDoc.moveUp().font('Times-Bold').text('Home Phone: ', { indent: 310 });
        pdfDoc.moveUp().font('Times-Roman').text(hPhone, { align: 'right' });

        pdfDoc.moveDown(.25).font('Times-Bold').text('Address: ');
        pdfDoc.moveUp().font('Times-Roman').text(addr, { indent: 100 });
        pdfDoc.moveUp().font('Times-Bold').text('Cell Phone: ', { indent: 310 });
        pdfDoc.moveUp().font('Times-Roman').text(cPhone, { align: 'right' });

        pdfDoc.moveDown(.25).font('Times-Bold').text('City, State Zip: ');
        pdfDoc.moveUp().font('Times-Roman').text(csz, { indent: 100 });
        pdfDoc.moveUp().font('Times-Bold').text('other Phone: ', { indent: 310 });
        pdfDoc.moveUp().font('Times-Roman').text(oPhone, { align: 'right' });

        pdfDoc.moveDown().font('Times-Bold').text('Shingle Material: ', { indent: 10 });
        pdfDoc.moveUp().font('Times-Roman').text(sMat, { indent: 105 });
        pdfDoc.moveUp().font('Times-Bold').text('Shingle Manufacturer: ', { indent: 250 });
        pdfDoc.moveUp().font('Times-Roman').text(sManu, { indent: 380 });

        pdfDoc.moveDown(.25).font('Times-Bold').text('Shingle Name: ', { indent: 10 });
        pdfDoc.moveUp().font('Times-Roman').text(roofCalc.sName, { indent: 105 });
        pdfDoc.moveUp().font('Times-Bold').text('Shingle Color: ', { indent: 250 });
        pdfDoc.moveUp().font('Times-Roman').text(roofCalc.sColor, { indent: 380 });

        pdfDoc.rect(70, 158, 470, 40).stroke();

        pdfDoc.moveDown().font('Times-Bold').text('Qty', { indent: 25, underline: true });
        pdfDoc.moveUp().text('Unit', { indent: 60, underline: true });
        pdfDoc.moveUp().text('Description', { indent: 100, underline: true });
        pdfDoc.moveUp().text('Color/Size', { indent: 380, underline: true });

        pdfDoc.moveDown(.25).font('Times-Roman').text(roofCalc.shingles, { indent: 25 });
        pdfDoc.moveUp().text('Sqr', { indent: 60 });
        pdfDoc.moveUp().text('SHINGLES', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.hipRidge, { indent: 25 });
        pdfDoc.moveUp().text('Bdl', { indent: 60 });
        pdfDoc.moveUp().text('Hip / Ridge - to match shingles', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.starter, { indent: 25 });
        pdfDoc.moveUp().text('Bdl', { indent: 60 });
        pdfDoc.moveUp().text('Starter - to match shingles', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.drip24, { indent: 25 });
        pdfDoc.moveUp().text('Ea', { indent: 60 });
        pdfDoc.moveUp().text('2 x 4 Drip Edge (100)', { indent: 100 });
        pdfDoc.moveUp().text(roofCalc.dripColor, { indent: 380 });

        pdfDoc.moveDown(.25).text(roofCalc.dripEdge, { indent: 25 });
        pdfDoc.moveUp().text('Ea', { indent: 60 });
        pdfDoc.moveUp().text('Drip Edge', { indent: 100 });
        pdfDoc.moveUp().text(roofCalc.dripSize, { indent: 380 });

        pdfDoc.moveDown(.25).text(roofCalc.felt, { indent: 25 });
        pdfDoc.moveUp().text('Roll', { indent: 60 });
        pdfDoc.moveUp().text('Felt', { indent: 100 });
        pdfDoc.moveUp().text(roofCalc.feltWgt, { indent: 380 });

        pdfDoc.moveDown(.25).text(roofCalc.iceWater, { indent: 25 });
        pdfDoc.moveUp().text('Roll', { indent: 60 });
        pdfDoc.moveUp().text('Ice & Water Shield - 2 squares per roll', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.lFlash, { indent: 25 });
        pdfDoc.moveUp().text('Ea', { indent: 60 });
        pdfDoc.moveUp().text('L Flashing', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.rollValley, { indent: 25 });
        pdfDoc.moveUp().text('Roll', { indent: 60 });
        pdfDoc.moveUp().text('Roll Valley metal 20"' + " - 50' per roll", { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.sFlash, { indent: 25 });
        pdfDoc.moveUp().text('Box', { indent: 60 });
        pdfDoc.moveUp().text('Step Flashing - 4" x 4" x 8" - Box of 100', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.cNail, { indent: 25 });
        pdfDoc.moveUp().text('Box', { indent: 60 });
        pdfDoc.moveUp().text('Coil Nails - 1 1/4" - 7,200 per box - 1 box per 16 squares', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.deck, { indent: 25 });
        pdfDoc.moveUp().text('Sheet', { indent: 60 });
        pdfDoc.moveUp().text('7/17" OSB Decking', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.turtleVents, { indent: 25 });
        pdfDoc.moveUp().text('Ea', { indent: 60 });
        pdfDoc.moveUp().text('Turtle Back Roof Vent - GAF RV50 or equivalent', { indent: 100 });
        pdfDoc.moveUp().text(roofCalc.turtleColor, { indent: 380 });

        pdfDoc.moveDown(.25).text(roofCalc.adjPipeVents, { indent: 25 });
        pdfDoc.moveUp().text('Ea', { indent: 60 });
        pdfDoc.moveUp().text('Adjustible Pipe Jacks / Boots', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.caulk, { indent: 25 });
        pdfDoc.moveUp().text('Tube', { indent: 60 });
        pdfDoc.moveUp().text('Caulk - Clear Silicon - 1 per 6 roof penetrations', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.sprayPaint, { indent: 25 });
        pdfDoc.moveUp().text('Can', { indent: 60 });
        pdfDoc.moveUp().text('Spray paint to match shingles - 1 can per roof jack vent', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.sprayPrimer, { indent: 25 });
        pdfDoc.moveUp().text('Can', { indent: 60 });
        pdfDoc.moveUp().text('Spray Primer', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.tinShingles, { indent: 25 });
        pdfDoc.moveUp().text('Box', { indent: 60 });
        pdfDoc.moveUp().text('Tin Shingles - 8" x 8" - box of 100', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.modBase, { indent: 25 });
        pdfDoc.moveUp().text('Modified Base', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.rollRoof, { indent: 25 });
        pdfDoc.moveUp().text('Roll Roofing similar to color samples', { indent: 100 });

        pdfDoc.moveDown(.25).text(roofCalc.versaCaps, { indent: 25 });
        pdfDoc.moveUp().text('Versa Caps', { indent: 100 });
        pdfDoc.moveUp().text(roofCalc.vcSize, { indent: 380 });

        pdfDoc.moveDown(.25).text(roofCalc.bVent, { indent: 25 });
        pdfDoc.moveUp().text('B Vents', { indent: 100 });
        pdfDoc.moveUp().text(roofCalc.bvSize, { indent: 380 });

        if (roofCalc.other1 == 0) {
            pdfDoc.moveDown(.25).text("-", { indent: 25 });
            pdfDoc.moveUp().text("-", { indent: 60 });
            pdfDoc.moveUp().text("-", { indent: 100 });
        } else {
            pdfDoc.moveDown(.25).text(roofCalc.other1, { indent: 25 });
            pdfDoc.moveUp().text(roofCalc.unit1, { indent: 60 });
            pdfDoc.moveUp().text(roofCalc.desc1, { indent: 100 });
        }

        if (roofCalc.other2 == 0) {
            pdfDoc.moveDown(.25).text("-", { indent: 25 });
            pdfDoc.moveUp().text("-", { indent: 60 });
            pdfDoc.moveUp().text("-", { indent: 100 });
        } else {
            pdfDoc.moveDown(.25).text(roofCalc.other2, { indent: 25 });
            pdfDoc.moveUp().text(roofCalc.unit2, { indent: 60 });
            pdfDoc.moveUp().text(roofCalc.desc2, { indent: 100 });
        }

        if (roofCalc.other3 == 0) {
            pdfDoc.moveDown(.25).text("-", { indent: 25 });
            pdfDoc.moveUp().text("-", { indent: 60 });
            pdfDoc.moveUp().text("-", { indent: 100 });
        } else {
            pdfDoc.moveDown(.25).text(roofCalc.other3, { indent: 25 });
            pdfDoc.moveUp().text(roofCalc.unit3, { indent: 60 });
            pdfDoc.moveUp().text(roofCalc.desc3, { indent: 100 });
        }

        if (roofCalc.other4 == 0) {
            pdfDoc.moveDown(.25).text("-", { indent: 25 });
            pdfDoc.moveUp().text("-", { indent: 60 });
            pdfDoc.moveUp().text("-", { indent: 100 });
        } else {
            pdfDoc.moveDown(.25).text(roofCalc.other4, { indent: 25 });
            pdfDoc.moveUp().text(roofCalc.unit4, { indent: 60 });
            pdfDoc.moveUp().text(roofCalc.desc4, { indent: 100 });
        }

        pdfDoc.moveDown(.25).font('Times-Bold').text('Order Notes: ');
        pdfDoc.moveUp().font('Times-Roman').text(roofCalc.orderNotes, { indent: 75 })


        // pdfDoc.rect(65, 350, 450, 175).stroke();

        // pdfDoc.moveDown(2).font('Times-Bold').text('Description: ');
        // pdfDoc.font('Times-Roman').text(workOrder.description);

        // pdfDoc.moveDown(11).font('Times-Bold').text('Work Order Total: $');
        // pdfDoc.moveUp().font('Times-Roman').text(workOrder.woTotal, {
        //     indent: 150
        // });


        // pdfDoc.moveDown().text('__________________________________________________________________');
        // pdfDoc.moveDown().font('Times-BoldItalic').text('The price shown on this work order is for the work detailed in the order. Should the price shown be insufficient to complete ther work, a new price would have to be agreed upon and a new work order issued PRIOR TO STARTING any work. NO COSTS ABOVE AND BEYOND THOSE SHOWN ON THIS WORK ORDER MAY BE INCURRED NOR WIL BE PAID.', { align: 'center' })

        pdfDoc.end();

    } catch (err) {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    }
};
 const Sequelize = require('sequelize');
 const { Op } = require('sequelize');
 const moment = require('moment');

 const fs = require('fs');
 const path = require('path');

 const PDFDocument = require('pdfkit');

 const Project = require('../models/project');
 const Supervisor = require('../models/supervisor');
 const Subcontractor = require('../models/subcontractor');
 const Sales = require('../models/sales');
 const Trades = require('../models/trades');
 const WorkOrder = require('../models/workOrder');

 exports.getWorkOrderTot = async(req, res, next) => {
     const projId = req.params.projectId

     try {
         const project = await Project.findByPk(projId)
         const workOrder = await WorkOrder.findAll({
             where: {
                 projectId: projId
             },
             include: [{
                 model: Sales
             }, {
                 model: Supervisor
             }, {
                 model: Subcontractor
             }],
         })

         res.render('work/workOrderTot', {
             pageTitle: 'Work Orders',
             path: '/workOrderTot',
             project: project,
             projId: projId,
             works: workOrder
         });
     } catch (err) {
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
     }

 };

 exports.getWos = async(req, res, next) => {
     const workId = req.params.workId;

     try {

         const sales = await Sales.findAll()
         const subcontractors = await Subcontractor.findAll()
         const supervisor = await Supervisor.findAll()
         const trades = await Trades.findAll()
         const workOrder = await WorkOrder.findByPk(workId, {
             include: [{
                 model: Sales
             }, {
                 model: Supervisor
             }, {
                 model: Project
             }, {
                 model: Subcontractor
             }],
         })
         const projId = workOrder.projectId;
         const project = await Project.findByPk(projId)

         res.render('work/wos', {
             pageTitle: 'Work Order',
             path: '/wos',
             workId: workId,
             projId: projId,
             project: project,
             sale: sales,
             subs: subcontractors,
             trades: trades,
             supers: supervisor,
             works: workOrder
         });
     } catch (err) {
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
     }

 };

 exports.postWos = async(req, res, next) => {
     const workId = req.body.workId;
     const updatedsubcontractorId = req.body.subcontractorId;
     const updatedstartDate = req.body.startDate;
     const updatedendDate = req.body.endDate;
     const updatedcompDate = req.body.compDate;
     const updatedComplete = req.body.complete;
     const updateddescription = req.body.description;
     const updatedtrade1 = req.body.trade1;
     const updatedtradeAmt1 = req.body.tradeAmt1;
     const updatedtrade2 = req.body.trade2;
     const updatedtradeAmt2 = req.body.tradeAmt2;
     const updatedtrade3 = req.body.trade3;
     const updatedtradeAmt3 = req.body.tradeAmt3;
     const updatedtrade4 = req.body.trade4;
     const updatedtradeAmt4 = req.body.tradeAmt4;
     const updatedwoTotal = req.body.woTotal;
     let a = moment(updatedstartDate).format("MM/DD/YY");
     let b = moment(updatedendDate).format("MM/DD/YY");
     console.log(a);
     console.log(b);

     let numDays = moment(b).diff(moment(a), 'days') + 1;
     try {
         const workOrder = await WorkOrder.findByPk(workId)

         workOrder.subcontractorId = updatedsubcontractorId;
         workOrder.startDate = updatedstartDate;
         workOrder.endDate = updatedendDate;
         workOrder.numDays = numDays;
         workOrder.compDate = updatedcompDate;
         workOrder.complete = updatedComplete;
         workOrder.description = updateddescription;
         workOrder.trade1 = updatedtrade1;
         workOrder.tradeAmt1 = updatedtradeAmt1;
         workOrder.trade2 = updatedtrade2;
         workOrder.tradeAmt2 = updatedtradeAmt2;
         workOrder.trade3 = updatedtrade3;
         workOrder.tradeAmt3 = updatedtradeAmt3;
         workOrder.trade4 = updatedtrade4;
         workOrder.tradeAmt4 = updatedtradeAmt4;
         workOrder.woTotal = updatedwoTotal;
         await workOrder.save();

         const projId = workOrder.projectId;
         const project = await Project.findByPk(projId)
         const workOrders = await WorkOrder.findAll({
             where: {
                 projectId: projId
             },
             include: [{
                 model: Sales
             }, {
                 model: Supervisor
             }, {
                 model: Subcontractor
             }],
         })

         res.render('work/workOrderTot', {
             pageTitle: 'Work Orders',
             path: '/workOrderTot',
             project: project,
             projId: projId,
             works: workOrders
         });
     } catch (err) {
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
     }

 };

 exports.getWorkOrder = async(req, res, next) => {
     const workId = req.params.workId;

     try {

         const workOrder = await WorkOrder.findByPk(workId, {
             include: [{
                 model: Sales
             }, {
                 model: Supervisor
             }, {
                 model: Project
             }, {
                 model: Subcontractor
             }],
         })
         const project = await Project.findAll({
             where: { id: workOrder.projectId }
         });

         const ofn = (workOrder.project.owner1Fn + " - " + workOrder.project.owner1Ln);
         const addr = (workOrder.project.address + ", " + workOrder.project.city + " - " + workOrder.project.zip);
         const field = (workOrder.supervisor.name);
         const srep = (workOrder.sale.name);
         const woName = 'workOrder-' + workId + '.pdf';
         const woPath = path.join('data', 'workOrders', woName);

         const pdfDoc = new PDFDocument();
         res.setHeader('Content-Type', 'application/pdf');
         res.setHeader('Content-Disposition', 'inline; filename="' + woName + '"');

         pdfDoc.pipe(fs.createWriteStream(woPath));
         pdfDoc.pipe(res);
         pdfDoc.font('Times-Roman');
         pdfDoc.image('./public/images/logo.png', {
             fit: [150, 200],
             align: 'center'
         });
         pdfDoc.moveDown();
         pdfDoc.fontSize(18).text('Work Order', {
             underline: true,
             align: 'center'
         });
         pdfDoc.moveDown().font('Times-Bold').fontSize(16).text('Subcontractor: ' + workOrder.subcontractor.coName, { align: 'center' });
         pdfDoc.moveDown().fontSize(14).text('Owner: ');
         pdfDoc.moveUp().font('Times-Roman').text(ofn, {
             indent: 75
         });
         pdfDoc.font('Times-Bold').text('Address: ');
         pdfDoc.moveUp().font('Times-Roman').text(addr, {
             indent: 75
         });

         pdfDoc.moveDown().font('Times-Bold').text('Start Date: ');
         pdfDoc.moveUp().font('Times-Roman').text(workOrder.startDate, { indent: 75 });
         pdfDoc.moveUp().font('Times-Bold').text('End Date: ', { indent: 185 });
         pdfDoc.moveUp().font('Times-Roman').text(workOrder.endDate, { indent: 250 });

         pdfDoc.moveDown().font('Times-Bold').text('Supervisor: ');
         pdfDoc.moveUp().font('Times-Roman').text(field, { indent: 75 });
         pdfDoc.moveUp().font('Times-Bold').text('Sales Rep: ', { indent: 185 });
         pdfDoc.moveUp().font('Times-Roman').text(srep, { indent: 250 });

         pdfDoc.rect(65, 350, 450, 175).stroke();

         pdfDoc.moveDown(2).font('Times-Bold').text('Description: ');
         pdfDoc.font('Times-Roman').text(workOrder.description);

         pdfDoc.moveDown(11).font('Times-Bold').text('Work Order Total: $');
         pdfDoc.moveUp().font('Times-Roman').text(workOrder.woTotal, {
             indent: 150
         });


         pdfDoc.moveDown().text('__________________________________________________________________');
         pdfDoc.moveDown().font('Times-BoldItalic').text('The price shown on this work order is for the work detailed in the order. Should the price shown be insufficient to complete ther work, a new price would have to be agreed upon and a new work order issued PRIOR TO STARTING any work. NO COSTS ABOVE AND BEYOND THOSE SHOWN ON THIS WORK ORDER MAY BE INCURRED NOR WIL BE PAID.', { align: 'center' })

         pdfDoc.end();

     } catch (err) {
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
     }

 };
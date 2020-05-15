const path = require('path')
const fs = require('fs');

const aws = require('aws-sdk');
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const multerS3 = require('multer-s3');
const sgMail = require('@sendgrid/mail');
const moment = require('moment');
const helmet = require('helmet');
const compression = require("compression");

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

console.log(process.env.NODE_ENV);

const Additions = require('./models/additions');
const Document = require('./models/document');
const Estimator = require('./models/estimator');
const Exclusions = require('./models/exclusions');
const Fundsrcvd = require('./models/fundsrcvd');
const Insurance = require('./models/insurance');
const Jobcosts = require('./models/jobcosts');
const Notes = require('./models/notes');
const Ownero = require('./models/ownero');
const Project = require('./models/project');
const Rtype = require('./models/rtype');
const Sales = require('./models/sales');
const Status = require('./models/status');
const Supervisor = require('./models/supervisor');
const Trades = require('./models/trades');
const User = require('./models/user');
const Subcontractor = require('./models/subcontractor');
const Supplier = require('./models/supplier');
const WorkOrder = require('./models/workorder');
const Wtb = require('./models/wtb');
const RoofCalc = require('./models/roofCalc');
const Reppay = require('./models/reppay');

const app = express();
const s3 = new aws.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAcessKey: process.env.AWS_SECRET_ACCESS_KEY
});

const options = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
};

const sessionStore = new MySQLStore(options);
const csrfProtection = csrf();

module.exports = fileUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cjrdocuments',
        metadata: (req, file, cb) => {
            cb(null, { fieldName: file.fieldname });
        }
    }),
    contentDisposition: 'document',
    key: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now().toString());
    }
});

moment().format("M/D/YY");
app.set('view engine', 'ejs');
app.set('views', 'views');

const projectRoutes = require('./routes/project');
const mainRoutes = require('./routes/main');
const addRoutes = require('./routes/add');
const workRoutes = require('./routes/work');
const roofRoutes = require('./routes/roof');
const searchRoutes = require('./routes/search');
const listsRoutes = require('./routes/lists');
const calendarRoutes = require('./routes/calendar');
const authRoutes = require('./routes/auth');

app.use(helmet());
app.use(compression());

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(multer({ storage: uploadS3 }).single('file'));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'sshh it is a secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore
}));
app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findByPk(req.session.user.id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});

app.use(projectRoutes);
app.use(mainRoutes);
app.use(addRoutes);
app.use(workRoutes);
app.use(roofRoutes);
app.use(searchRoutes);
app.use(calendarRoutes)
app.use(listsRoutes);
app.use(authRoutes);

app.get('/500', errorController.get500);

app.use(errorController.get404);

app.use((error, req, res, next) => {
    res.status(500).render('500', {
        pageTitle: 'Error!',
        path: '/500'
    });
});

Project.belongsTo(Sales);
Sales.hasMany(Project);
Project.belongsTo(Supervisor);
Supervisor.hasMany(Project);
Project.belongsTo(Insurance);
Insurance.hasMany(Project);
Project.belongsTo(Status);
Status.hasMany(Project);
Project.belongsTo(Estimator);
Estimator.hasMany(Project);
Document.belongsTo(Project);
Project.hasMany(Document);
Additions.belongsTo(Trades);
Project.hasMany(Additions);
Exclusions.belongsTo(Trades);
Project.hasMany(Exclusions);
Jobcosts.belongsTo(Trades);
Project.hasMany(Jobcosts);
Ownero.belongsTo(Trades);
Project.hasMany(Ownero);
Notes.belongsTo(Project);
Project.hasMany(Notes);
Document.belongsTo(Rtype);
Rtype.hasMany(Document);
Wtb.belongsTo(Project);
Project.hasMany(Wtb);
Wtb.belongsTo(Trades)
Trades.hasMany(Wtb);
WorkOrder.belongsTo(Project);
Project.hasMany(WorkOrder);
WorkOrder.belongsTo(Sales);
Sales.hasMany(WorkOrder);
WorkOrder.belongsTo(Supervisor);
Supervisor.hasMany(WorkOrder);
WorkOrder.belongsTo(Subcontractor);
Subcontractor.hasMany(WorkOrder);
RoofCalc.belongsTo(Project);
Project.hasOne(RoofCalc);
Project.hasMany(Reppay);
Project.hasMany(Fundsrcvd);

sequelize
// .sync()
// .then(result => {
app.listen(process.env.PORT || 3002);;
// })
// .catch(err => {
//     console.log(err);
// });
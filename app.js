const path = require('path')

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');
const multer = require('multer');
const phone = require('phone');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const Additions = require('./models/additions');
const Document = require('./models/document');
const Estimator = require('./models/estimator');
const Exclusions = require('./models/exclusions');
const FundsRcvd = require('./models/fundsRcvd');
const Insurance = require('./models/insurance');
const JobCosts = require('./models/jobCosts');
const Notes = require('./models/notes');
const OwnerOop = require('./models/ownerOop');
const Project = require('./models/project');
const RType = require('./models/rType');
const Sales = require('./models/sales');
const Status = require('./models/status');
const Supervisor = require('./models/supervisor');
const Trades = require('./models/trades');
const User = require('./models/user');

const app = express();

const options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'cjdatabase'
};

const sessionStore = new MySQLStore(options);
const csrfProtection = csrf();

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/documents');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})

app.set('view engine', 'ejs');
app.set('views', 'views');

const projectRoutes = require('./routes/project');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage }).single('docFile'));
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
Project.hasMany(FundsRcvd);
JobCosts.belongsTo(Trades);
Project.hasMany(JobCosts);
OwnerOop.belongsTo(Trades);
Project.hasMany(OwnerOop);
Notes.belongsTo(Project)
Project.hasMany(Notes);
Project.belongsTo(Trades)
Trades.hasMany(Project);
RType.belongsTo(Document);
Document.hasMany(RType);

sequelize
// .sync({ force: true })
    .sync()
    .then(result => {
        // console.log(result);
        app.listen(3002);;
    })
    .catch(err => {
        console.log(err);
    });
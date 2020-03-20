const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const RoofCalc = sequelize.define('roofCalc', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sMaterial: Sequelize.STRING,
    sManufacturer: Sequelize.STRING,
    sName: Sequelize.STRING,
    sColor: Sequelize.STRING,
    ridge: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    hip: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    valley: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    rake: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    eaveStarter: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    flashing: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    stepFlashing: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    totalArea: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    squares: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    rollValley: Sequelize.STRING,
    turtleVents: Sequelize.STRING,
    adjPipeVents: Sequelize.STRING,
    caulk: Sequelize.STRING,
    sprayPaint: Sequelize.STRING,
    sprayPrimer: Sequelize.STRING,
    tinShingles: Sequelize.STRING,
    modBase: Sequelize.STRING,
    rollRoof: Sequelize.STRING,
    dripColor: Sequelize.STRING,
    dripSize: Sequelize.STRING,
    feltWgt: Sequelize.STRING,
    noIWCourses: Sequelize.STRING,
    turtleColor: Sequelize.STRING,
    versaCaps: Sequelize.STRING,
    vcSize: Sequelize.STRING,
    bVent: Sequelize.STRING,
    bvSize: Sequelize.STRING,
    other1: Sequelize.STRING,
    unit1: Sequelize.STRING,
    desc1: Sequelize.STRING,
    other2: Sequelize.STRING,
    unit2: Sequelize.STRING,
    desc2: Sequelize.STRING,
    other3: Sequelize.STRING,
    unit3: Sequelize.STRING,
    desc3: Sequelize.STRING,
    other4: Sequelize.STRING,
    unit4: Sequelize.STRING,
    desc4: Sequelize.STRING,
    supplier: Sequelize.STRING,
    orderDate: Sequelize.DATEONLY,
    orderNotes: Sequelize.STRING,
    shingles: {
        type: Sequelize.INTEGER,
        default: 0.00
    },
    hipRidge: {
        type: Sequelize.INTEGER,
        default: 0.00
    },
    starter: {
        type: Sequelize.INTEGER,
        default: 0.00
    },
});

module.exports = RoofCalc;
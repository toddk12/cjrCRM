const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Project = sequelize.define('project', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    projectNo: Sequelize.STRING,
    owner1Fn: Sequelize.STRING,
    owner1Ln: Sequelize.STRING,
    owner2Fn: Sequelize.STRING,
    owner2Ln: Sequelize.STRING,
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: Sequelize.STRING,
    state: {
        type: Sequelize.STRING,
        defaultValue: "CO"
    },
    zip: Sequelize.STRING,
    hPhone: Sequelize.STRING,
    cPhone: Sequelize.STRING,
    oPhone: Sequelize.STRING,
    email: Sequelize.STRING,
    commercial: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    bName: Sequelize.STRING,
    bAddress: Sequelize.STRING,
    bCity: Sequelize.STRING,
    bState: {
        type: Sequelize.STRING,
        defaultValue: "CO"
    },
    bZip: Sequelize.STRING,
    oCoName: Sequelize.STRING,
    oContact: Sequelize.STRING,
    oAddress: Sequelize.STRING,
    oCity: Sequelize.STRING,
    oState: {
        type: Sequelize.STRING,
        defaultValue: "CO"
    },
    oZip: Sequelize.STRING,
    oPhon1: Sequelize.STRING,
    oPhone2: Sequelize.STRING,
    oEmail: Sequelize.STRING,
    pmCoName: Sequelize.STRING,
    pmContact: Sequelize.STRING,
    pmAddress: Sequelize.STRING,
    pmCity: Sequelize.STRING,
    pmState: {
        type: Sequelize.STRING,
        defaultValue: "CO"
    },
    pmZip: Sequelize.STRING,
    pmPhon1: Sequelize.STRING,
    pmPhone2: Sequelize.STRING,
    pmEmail: Sequelize.STRING,
    entDate: {
        type: Sequelize.DATEONLY,
        defaultValue: new Date()
    },
    entBy: Sequelize.INTEGER,
    estDate: Sequelize.DATEONLY,
    estBy: Sequelize.INTEGER,
    prodDate: Sequelize.DATEONLY,
    prodBy: Sequelize.INTEGER,
    aiDate: Sequelize.DATEONLY,
    aiBy: Sequelize.INTEGER,
    closeDate: Sequelize.DATEONLY,
    closeBy: Sequelize.INTEGER,
    compDate: Sequelize.DATEONLY,
    compBy: Sequelize.INTEGER,
    collectDate: Sequelize.DATEONLY,
    collectBy: Sequelize.INTEGER,
    cancelDate: Sequelize.DATEONLY,
    cancelBy: Sequelize.INTEGER,
    denyDate: Sequelize.DATEONLY,
    denyBy: Sequelize.INTEGER,
    holdDate: Sequelize.DATEONLY,
    holdBy: Sequelize.INTEGER,
    policyNo: Sequelize.STRING,
    claimNo: Sequelize.STRING,
    dateLoss: Sequelize.DATEONLY,
    typeLoss: Sequelize.STRING,
    deductible: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    oScopeDate: Sequelize.DATEONLY,
    oScopeRCV: Sequelize.FLOAT(10, 2),
    oScopeACV: Sequelize.FLOAT(10, 2),
    fScopeDate: Sequelize.DATEONLY,
    fScopeRCV: Sequelize.FLOAT(10, 2),
    fScopeACV: Sequelize.FLOAT(10, 2),
    adjName: Sequelize.STRING,
    adjPhone: Sequelize.STRING,
    ownerOOP: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    totalFundsRcvd: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    totalJobCosts: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    estComplete: Sequelize.BOOLEAN,
    totalRepPay: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    totalProject: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    amtOwedRep: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    amtOwnerOwes: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    capOutProfit: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    overhead: Sequelize.FLOAT(5, 4),
    repPercent: Sequelize.FLOAT(5, 4),
    grossProfit: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    totalExclusions: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    adjFScope: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },
    rcvChange: {
        type: Sequelize.FLOAT(10, 2),
        defaultValue: 0
    },

});

module.exports = Project;
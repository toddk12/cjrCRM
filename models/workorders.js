const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const WorkOrder = sequelize.define('workorders', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startDate: Sequelize.DATEONLY,
    endDate: Sequelize.DATEONLY,
    numDays: Sequelize.INTEGER,
    compDate: Sequelize.DATEONLY,
    complete: Sequelize.BOOLEAN,
    description: Sequelize.TEXT,
    description: Sequelize.TEXT,
    trade1: Sequelize.STRING,
    tradeAmt1: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    trade2: Sequelize.STRING,
    tradeAmt2: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    trade3: Sequelize.STRING,
    tradeAmt3: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    trade4: Sequelize.STRING,
    tradeAmt4: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    woTotal: {
        type: Sequelize.FLOAT(10, 2),
        default: 0.00
    },
    dependancy1: Sequelize.INTEGER,
    dependancy2: Sequelize.INTEGER,
    dependancy3: Sequelize.INTEGER
});

module.exports = WorkOrder;
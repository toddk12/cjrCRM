const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const WorkOrder = sequelize.define('workOrder', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    startDate: Sequelize.DATEONLY,
    endDate: Sequelize.DATEONLY,
    compDate: Sequelize.DATEONLY,
    complete: Sequelize.BOOLEAN,
    description: Sequelize.TEXT,
    description: Sequelize.TEXT,
    tradeId1: Sequelize.INTEGER,
    tradeAmt1: { type: Sequelize.FLOAT(10, 2) },
    tradeId2: Sequelize.INTEGER,
    tradeAmt2: { type: Sequelize.FLOAT(10, 2) },
    tradeId3: Sequelize.INTEGER,
    tradeAmt3: { type: Sequelize.FLOAT(10, 2) },
    tradeId4: Sequelize.INTEGER,
    tradeAmt4: { type: Sequelize.FLOAT(10, 2) },
    woTotal: { type: Sequelize.FLOAT(10, 2) },
    dependancy1: Sequelize.INTEGER,
    dependancy2: Sequelize.INTEGER,
    dependancy3: Sequelize.INTEGER
});

module.exports = WorkOrder;
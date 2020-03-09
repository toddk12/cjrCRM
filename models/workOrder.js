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
    tradeAmt1: { type: Sequelize.FLOAT(10, 2) },
    tradeAmt2: { type: Sequelize.FLOAT(10, 2) },
    tradeAmt3: { type: Sequelize.FLOAT(10, 2) },
    tradeAmt4: { type: Sequelize.FLOAT(10, 2) },
    woTotal: { type: Sequelize.FLOAT(10, 2) }
});

module.exports = WorkOrder;
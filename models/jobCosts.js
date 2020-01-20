const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const JobCosts = sequelize.define('jobCosts', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    enteredBy: Sequelize.STRING,
    entryDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    costAmt: { type: Sequelize.DECIMAL(10, 2) },
    costMemo: { type: Sequelize.STRING }

});

module.exports = JobCosts;
const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Jobcosts = sequelize.define('jobcosts', {
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
    costAmt: { type: Sequelize.FLOAT(10, 2) },
    costMemo: { type: Sequelize.STRING }

});

module.exports = Jobcosts;
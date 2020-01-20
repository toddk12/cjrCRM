const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Sales = sequelize.define('sales', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    }
});

module.exports = Sales;
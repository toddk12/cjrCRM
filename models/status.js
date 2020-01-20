const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Status = sequelize.define('status', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: Sequelize.STRING
});

module.exports = Status;
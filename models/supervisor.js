const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Supervisor = sequelize.define('supervisor', {
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
    email: Sequelize.STRING,
    active: {
        type: Sequelize.BOOLEAN,
        defaultValue: 1
    }
});

module.exports = Supervisor;
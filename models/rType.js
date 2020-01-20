const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const RType = sequelize.define('rType', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = RType;
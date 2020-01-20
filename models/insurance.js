const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Insurance = sequelize.define('insurance', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    coName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: Sequelize.STRING,
    address2: Sequelize.STRING,
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    zip: Sequelize.STRING,
    phone1: Sequelize.STRING,
    phone2: Sequelize.STRING,
    phone3: Sequelize.STRING,
    website: Sequelize.STRING,
    email1: Sequelize.STRING,
    email2: Sequelize.STRING
});

module.exports = Insurance;
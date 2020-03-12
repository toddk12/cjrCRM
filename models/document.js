const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Document = sequelize.define('document', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    projectId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },

    docName: {
        type: Sequelize.STRING
    },

    docFile: {
        type: Sequelize.STRING
    },

    docPath: {
        type: Sequelize.STRING
    }
});

module.exports = Document;
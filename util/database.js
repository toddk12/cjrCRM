const Sequelize = require('sequelize');

const sequelize = new Sequelize('cjdatabase', 'usasecuritynet', 'AmxhudE3', {
    host: 'usasecuritynet.ipagemysql.com',
    port: 3306,
    dialect: 'mysql'
});

module.exports = sequelize;
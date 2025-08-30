const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mssql',
  port: process.env.DB_PORT || 1433,
  dialectOptions: {
    options: {
      encrypt: false, // or true if your server requires it
      trustServerCertificate: true, // important if self-signed cert
      // If you want to use Windows Authentication, set below:
      // integratedSecurity: true,
    },
  },
   timezone: "+00:00",
  logging: false,
});

module.exports = sequelize;

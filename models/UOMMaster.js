// models/UOMMaster.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UOMMaster = sequelize.define('UOMMaster', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UOM: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CreatedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  CreatedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  UpdatedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  UpdateDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Selected: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  }
}, {
  tableName: 'GSTUOM',
  schema: 'dbo',
  timestamps: false
});

module.exports = UOMMaster;

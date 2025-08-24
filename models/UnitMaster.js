const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UnitMaster = sequelize.define('UnitMaster', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  UnitName: {
    type: DataTypes.STRING
  },
  UDecimal: {
    type: DataTypes.INTEGER
  },
  CreatedBy: {
    type: DataTypes.STRING
  },
  CreatedDate: {
    type: DataTypes.DATE
  },
  UpdatedBy: {
    type: DataTypes.STRING
  },
  UpdateDate: {
    type: DataTypes.DATE
  },
  Selected: {
    type: DataTypes.BOOLEAN
  },
  GSTUOM: {
    type: DataTypes.STRING
  },
  UOM_Type: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'UnitMaster',
  timestamps: false,
});

module.exports = UnitMaster;

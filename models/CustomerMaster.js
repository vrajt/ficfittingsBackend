// models/CustomerMaster.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // adjust path to your sequelize instance

const CustomerMaster = sequelize.define('CustomerMaster', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Tele_Off: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Mobile: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Contact_1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  EMail_1: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  Contact_2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  EMail_2: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  IsBlocked: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
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
    allowNull: false,
    defaultValue: false
  }
}, {
  tableName: 'CustomerMaster',
  schema: 'dbo',
  timestamps: false
});

module.exports = CustomerMaster;

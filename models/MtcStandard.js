// models/MtcStandard.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MtcStandard = sequelize.define('MtcStandard', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Std_Id: {
    type: DataTypes.STRING,
    allowNull: true // will be set after Id is generated
  },
  Std_Type: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: 'MtcStandard',
  schema: 'dbo',
  timestamps: false
});

// Hook to set Std_Id = Id after creation
MtcStandard.afterCreate(async (standard, options) => {
  if (!standard.Std_Id) {
    standard.Std_Id = standard.Id.toString();
    await standard.save({ transaction: options.transaction });
  }
});

module.exports = MtcStandard;

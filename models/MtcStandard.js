// models/MtcStandard.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // adjust path to your db config

const MtcStandard = sequelize.define("MtcStandard", {
  Std_Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Std_Type: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  IsBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  CreatedBy: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  CreatedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  UpdatedBy: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  UpdateDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Selected: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "MtcStandard",
  schema: "dbo",              // ✅ since your table is inside dbo
  timestamps: false,          // ✅ because you already have CreatedDate / UpdateDate
});

module.exports = MtcStandard;

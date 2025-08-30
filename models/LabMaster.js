const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LabMaster = sequelize.define("LabMaster", {
  Id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  LabId: { 
    type: DataTypes.VIRTUAL,   // not stored directly, derived from Id
    get() {
      return this.getDataValue("Id");  // always return same as Id
    },
    set(value) {
      throw new Error("LabId is auto-generated from Id and cannot be set manually.");
    }
  },
  LabName: { type: DataTypes.STRING, allowNull: false },
  CAddress: { type: DataTypes.STRING },
  Tele_Off: { type: DataTypes.STRING },
  Mobile: { type: DataTypes.STRING },
  Contact_1: { type: DataTypes.STRING },
  EMail_1: { type: DataTypes.STRING },
  Contact_2: { type: DataTypes.STRING },
  EMail_2: { type: DataTypes.STRING },
  IsBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
  CreatedBy: { type: DataTypes.STRING },
  CreatedDate: { type: DataTypes.DATE, allowNull: true },   // maps to datetime2
  UpdatedBy: { type: DataTypes.STRING },
  UpdateDate: { type: DataTypes.DATE, allowNull: true },    // maps to datetime2
  Selected: { type: DataTypes.BOOLEAN, defaultValue: false } // maps 0/1
}, {
  tableName: "Lab_Master",
  timestamps: false
});

module.exports = LabMaster;

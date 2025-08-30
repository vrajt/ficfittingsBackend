const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const DimStandard = sequelize.define("DimStandard", {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  DStd_Id: { type: DataTypes.INTEGER },
  DStd_Type: { type: DataTypes.STRING },
  IsBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
  CreatedBy: { type: DataTypes.STRING },
  CreatedDate: { type: DataTypes.DATE },  // datetime2
  UpdatedBy: { type: DataTypes.STRING },
  UpdateDate: { type: DataTypes.DATE },   // datetime2
  Selected: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  tableName: "Dim_Standard",
  timestamps: false,
  hooks: {
    beforeCreate: (record) => {
      record.DStd_Id = record.Id;  // copy Id → DStd_Id
    }
  }
});

module.exports = DimStandard;

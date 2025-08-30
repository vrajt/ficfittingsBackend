const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TcRemarksFix = sequelize.define("TcRemarksFix", {
  Id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  TcTerms: { type: DataTypes.STRING, allowNull: false },
  IsBlocked: { type: DataTypes.BOOLEAN, defaultValue: false },
  CreatedBy: { type: DataTypes.STRING },
  CreatedDate: { type: DataTypes.DATE, allowNull: true },  // plain DATE
  UpdatedBy: { type: DataTypes.STRING },
  UpdateDate: { type: DataTypes.DATE, allowNull: true },   // plain DATE
 TcChoice: { type: DataTypes.BOOLEAN, allowNull: true }
}, {
  tableName: "TcRemarksFix",
  timestamps: false
});

module.exports = TcRemarksFix;

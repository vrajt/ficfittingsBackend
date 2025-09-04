const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TcItem = sequelize.define("TcItem", {
  Id: { type: DataTypes.BIGINT, allowNull: true }, // NOT primary
  ApsFullDoc: { type: DataTypes.STRING(50), allowNull: false },
  PId: { type: DataTypes.BIGINT, allowNull: true },
  Po_Inv_PId: { type: DataTypes.BIGINT, allowNull: true },
  HeatNo: { type: DataTypes.STRING(50), allowNull: true },
  ProductName: { type: DataTypes.STRING(75), allowNull: true },
  Qty1: { type: DataTypes.DECIMAL, allowNull: true },
  Qty1Unit: { type: DataTypes.STRING(15), allowNull: true },
  GradeName: { type: DataTypes.STRING(50), allowNull: true },
  Specification: { type: DataTypes.STRING(150), allowNull: true },
  FyFrom: { type: DataTypes.DATE, allowNull: true },      // datetime2
  FyTo: { type: DataTypes.DATE, allowNull: true },        // datetime2
  CreatedBy: { type: DataTypes.BIGINT, allowNull: true },
  CreatedDate: { type: DataTypes.DATE, allowNull: true },
  UpdatedBy: { type: DataTypes.BIGINT, allowNull: true },
  UpdateDate: { type: DataTypes.DATE, allowNull: true },
  TcChoice: { type: DataTypes.BOOLEAN, allowNull: true }
}, {
  tableName: "TcItem",
  timestamps: false,
  primaryKey: false
});

module.exports = TcItem;

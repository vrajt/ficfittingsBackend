const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TcOthTestDet = sequelize.define(
  "TcOthTestDet",
  {
    Id: { type: DataTypes.BIGINT, allowNull: true }, // not primary, no autoIncrement
    ApsFullDoc: { type: DataTypes.STRING(50), allowNull: false },
    PId: { type: DataTypes.BIGINT, allowNull: true },
    HeatNo: { type: DataTypes.STRING(50), allowNull: true },
    Test_Code: { type: DataTypes.STRING(50), allowNull: true },
    Test_Desc: { type: DataTypes.STRING(150), allowNull: true },
    FyFrom: { type: DataTypes.DATE, allowNull: true },
    FyTo: { type: DataTypes.DATE, allowNull: true },
    CreatedBy: { type: DataTypes.BIGINT, allowNull: true },
    CreatedDate: { type: DataTypes.DATE, allowNull: true },
    UpdatedBy: { type: DataTypes.BIGINT, allowNull: true },
    UpdateDate: { type: DataTypes.DATE, allowNull: true },
    TcChoice: { type: DataTypes.BOOLEAN, allowNull: true },
  },
  {
    tableName: "TcOthTestDet",
    timestamps: false,
    primaryKey: false, // explicitly tell Sequelize there is no PK
  }
);

module.exports = TcOthTestDet;

// models/TcMain.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TcMain = sequelize.define("TcMain", {
  Id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  BranchId: { type: DataTypes.BIGINT },
  TCode: { type: DataTypes.STRING(50) },
  STCode: { type: DataTypes.STRING(50) },
  UserNo: { type: DataTypes.BIGINT },
  ApsUserNo: { type: DataTypes.BIGINT },
  ApsFullDoc: { type: DataTypes.STRING(255) },
  DocDate: { type: DataTypes.DATE },
  PoNo: { type: DataTypes.STRING(50) },
  PoDate: { type: DataTypes.DATE },
  InvNo: { type: DataTypes.STRING(50) },
  InvDate: { type: DataTypes.DATE },
  AccCode: { type: DataTypes.STRING(50) },
  AccType: { type: DataTypes.STRING(50) },
  AddressId: { type: DataTypes.BIGINT },
  ContactId: { type: DataTypes.BIGINT },
  AccCurr: { type: DataTypes.STRING(10) },
  ExchangeRate: { type: DataTypes.DECIMAL(18, 4) },
  AccName: { type: DataTypes.STRING(100) },
  Address1: { type: DataTypes.STRING(150) },
  Address2: { type: DataTypes.STRING(150) },
  Address3: { type: DataTypes.STRING(150) },
  City: { type: DataTypes.STRING(75) },
  State: { type: DataTypes.STRING(75) },
  Std_Id: { type: DataTypes.BIGINT },
  Std_Type: { type: DataTypes.STRING(50) },
  ProductName: { type: DataTypes.STRING(75) },
  ProductDesc: { type: DataTypes.STRING(150) },
  GradeId: { type: DataTypes.BIGINT },
  GradeName: { type: DataTypes.STRING(50) },
  DStd_Id: { type: DataTypes.BIGINT },
  DStd_Type: { type: DataTypes.STRING(50) },
  SM_Id: { type: DataTypes.BIGINT },
  SM_RM_Name: { type: DataTypes.STRING(75) },
  FyFrom: { type: DataTypes.DATE },
  FyTo: { type: DataTypes.DATE },
  CreatedBy: { type: DataTypes.BIGINT },
  CreatedDate: { type: DataTypes.DATE },
  UpdatedBy: { type: DataTypes.BIGINT },
  UpdateDate: { type: DataTypes.DATE },
  TcChoice: { type: DataTypes.BOOLEAN }
}, {
  tableName: "TcMain",
  timestamps: false,
});

module.exports = TcMain;

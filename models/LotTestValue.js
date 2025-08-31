const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const LotTestValue = sequelize.define("LotTestValue", {
  Id: { 
    type: DataTypes.BIGINT, 
    primaryKey: true, 
    autoIncrement: true 
  },
  HeatNo: { type: DataTypes.STRING(20) },
  ProductName: { type: DataTypes.STRING(75) },
  Qty1: { type: DataTypes.DECIMAL },
  Qty1Unit: { type: DataTypes.STRING(15) },
  GradeName: { type: DataTypes.STRING(50) },
  Specification: { type: DataTypes.STRING(150) },
  Parm_Type: { type: DataTypes.STRING(2) },
  Parm_Code: { type: DataTypes.STRING(15) },
  Parm_Name: { type: DataTypes.STRING(35) },
  Data_Type: { type: DataTypes.STRING(1) },
  Name_Edit: { type: DataTypes.BOOLEAN },
  Min_Value: { type: DataTypes.DECIMAL },
  Max_Value: { type: DataTypes.DECIMAL },
  Test_ValueN: { type: DataTypes.DECIMAL },
  Test_ValueC: { type: DataTypes.STRING(50) },
  Lab_Id: { type: DataTypes.BIGINT },
  Lab_Name: { type: DataTypes.STRING(75) },
  Lab_TC_No: { type: DataTypes.STRING(25) },
  Lab_TC_Date: { type: DataTypes.DATE },
  ITJ_Temp: { type: DataTypes.DECIMAL },
  ITJ_Size: { type: DataTypes.STRING(50) },
  ITJ_Value_1: { type: DataTypes.STRING(50) },
  ITJ_Value_2: { type: DataTypes.STRING(50) },
  ITJ_Value_3: { type: DataTypes.STRING(50) },
  ITJ_Value_Avg: { type: DataTypes.STRING(50) },
  FyFrom: { type: DataTypes.DATE },
  FyTo: { type: DataTypes.DATE },
  CreatedBy: { type: DataTypes.BIGINT },
  CreatedDate: { type: DataTypes.DATE },
  UpdatedBy: { type: DataTypes.BIGINT },
  UpdateDate: { type: DataTypes.DATE },
  TcChoice: { type: DataTypes.BOOLEAN },
  Parm_UOM: { type: DataTypes.STRING(50) }
}, {
  tableName: "Lot_Test_Value",
  timestamps: false
});

module.exports = LotTestValue;

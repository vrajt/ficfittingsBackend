const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OtherTestMaster = sequelize.define("OtherTestMaster", {
  Id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  Test_Code: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  Test_Desc: { 
    type: DataTypes.STRING, 
    allowNull: true 
  },
  IsBlocked: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  },
  CreatedBy: { type: DataTypes.STRING },
  CreatedDate: { type: DataTypes.DATE },
  UpdatedBy: { type: DataTypes.STRING },
  UpdateDate: { type: DataTypes.DATE },
  TcChoice: { type: DataTypes.STRING }
}, {
  tableName: "OtherTestMaster",
  timestamps: false
});

module.exports = OtherTestMaster;

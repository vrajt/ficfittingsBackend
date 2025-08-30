const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const HeatTestMaster = sequelize.define("HeatTestMaster", {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Heat_Code: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Heat_Desc: {
    type: DataTypes.STRING,
    allowNull: true
  },
  IsBlocked: {
    type: DataTypes.BOOLEAN,  // stored as BIT (0/1)
    defaultValue: false
  },
  CreatedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  CreatedDate: {
    type: DataTypes.DATE,     // maps to DATETIME2 in SQL Server
    allowNull: true
  },
  UpdatedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  UpdateDate: {
    type: DataTypes.DATE,     // DATETIME2
    allowNull: true
  },
  TcChoice: {
    type: DataTypes.BOOLEAN,  // stored as BIT (0/1)
    allowNull: true
  }
}, {
  tableName: "HeatTestMaster",
  timestamps: false
});

module.exports = HeatTestMaster;

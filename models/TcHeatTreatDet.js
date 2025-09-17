const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TcHeatTreatDet = sequelize.define("TcHeatTreatDet", {
Id: {
  type: DataTypes.BIGINT,
  allowNull: false,
  primaryKey: true,
  autoIncrement: false   // ❌ turn this off
},
  ApsFullDoc: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  // Your error log shows PId is being inserted, so it must be in the model
  PId: { 
    type: DataTypes.BIGINT, 
    allowNull: true 
  },
  HeatNo: { 
    type: DataTypes.STRING(50), 
    allowNull: true 
  },
  Heat_Code: { 
    type: DataTypes.STRING(50), 
    allowNull: true 
  },
  Heat_Desc: { 
    type: DataTypes.STRING(150), 
    allowNull: true 
  },
  FyFrom: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
  FyTo: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
  CreatedBy: { 
    type: DataTypes.BIGINT, 
    allowNull: true 
  },
  CreatedDate: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
  UpdatedBy: { 
    type: DataTypes.BIGINT, 
    allowNull: true 
  },
  UpdateDate: { 
    type: DataTypes.DATE, 
    allowNull: true 
  },
  TcChoice: { 
    type: DataTypes.BOOLEAN, 
    allowNull: true 
  },
}, {
  tableName: "TcHeatTreatDet",
  timestamps: false,
});

module.exports = TcHeatTreatDet;
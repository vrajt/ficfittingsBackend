const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const SrmMaster = sequelize.define("SrmMaster", {
  Id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  SM_Id: { 
    type: DataTypes.INTEGER, 
    allowNull: true
  },
  SM_RM_Name: { 
    type: DataTypes.STRING, 
    allowNull: false
  },
  IsBlocked: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  },
  CreatedBy: { type: DataTypes.STRING },
  CreatedDate: { 
    type: DataTypes.DATE, // maps to datetime2
    allowNull: true
  },
  UpdatedBy: { type: DataTypes.STRING },
  UpdateDate: { 
    type: DataTypes.DATE, 
    allowNull: true
  },
  Selected: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  }
}, {
  tableName: "Start_Material",
  timestamps: false,
});

// ✅ Hook to copy Id to SM_Id after creation
SrmMaster.afterCreate(async (instance, options) => {
  if (!instance.SM_Id) {
    instance.SM_Id = instance.Id;
    await instance.save({ transaction: options.transaction });
  }
});

module.exports = SrmMaster;

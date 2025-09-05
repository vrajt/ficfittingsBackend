// models/CustomerMaster.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // adjust path to your sequelize instance

const CustomerMaster = sequelize.define('CustomerMaster', {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  CId: {
    type: DataTypes.STRING,
    allowNull: true // will be set after Id is generated
  },
  CName: {
    type: DataTypes.STRING,
    allowNull: false // ✅ Only this field is mandatory
  },
  CAddress: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Tele_Off: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Mobile: {
    type: DataTypes.STRING,
    allowNull: true
  },
  Contact_1: {
    type: DataTypes.STRING,
    allowNull: true
  },
  EMail_1: {
    type: DataTypes.STRING,
    allowNull: true,
    
  },
  Contact_2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  EMail_2: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  IsBlocked: {
    type: DataTypes.BOOLEAN,
    allowNull: true, // ✅ nullable (default false will handle empty case)
    defaultValue: false
  },
  CreatedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  CreatedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  UpdatedBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  UpdateDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  Selected: {
    type: DataTypes.BOOLEAN,
    allowNull: true, // ✅ nullable
    defaultValue: false
  }
}, {
  tableName: 'CustomerMaster',
  schema: 'dbo',
  timestamps: false
});

// Hook to set CId = Id after creation
CustomerMaster.afterCreate(async (customer, options) => {
  if (!customer.CId) {
    customer.CId = customer.Id.toString();
    await customer.save({ transaction: options.transaction });
  }
});

module.exports = CustomerMaster;

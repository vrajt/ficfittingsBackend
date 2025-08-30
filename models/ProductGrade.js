const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ProductGrade = sequelize.define("ProductGrade", {
  Id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  GradeId: {
    type: DataTypes.INTEGER,
    allowNull: true // initially allow null, will be set after creation
  },
  GradeName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  IsBlocked: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  CreatedBy: {
    type: DataTypes.STRING
  },
 CreatedDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  UpdatedBy: {
    type: DataTypes.STRING
  },
  UpdateDate: {
    type: DataTypes.DATE
  },
  Selected: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: "ProductGrade",
  timestamps: false
});

// Hook to set GradeId = Id after creation
ProductGrade.afterCreate(async (grade, options) => {
  grade.GradeId = grade.Id;
  await grade.save({ transaction: options.transaction });
});

module.exports = ProductGrade;

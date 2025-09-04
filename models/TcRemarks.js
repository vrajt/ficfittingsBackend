const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TcRemarks = sequelize.define(
  "TcRemarks",
  {
    Id: { type: DataTypes.BIGINT, allowNull: true }, // not primary, no autoIncrement
    ApsFullDoc: { type: DataTypes.STRING(50), allowNull: false },
    PId: { type: DataTypes.BIGINT, allowNull: true },
    TcTerms: { type: DataTypes.STRING(500), allowNull: true },
    FyFrom: { type: DataTypes.DATE, allowNull: true },
    FyTo: { type: DataTypes.DATE, allowNull: true },
    CreatedBy: { type: DataTypes.BIGINT, allowNull: true },
    CreatedDate: { type: DataTypes.DATE, allowNull: true },
    UpdatedBy: { type: DataTypes.BIGINT, allowNull: true },
    UpdateDate: { type: DataTypes.DATE, allowNull: true },
    TcChoice: { type: DataTypes.BOOLEAN, allowNull: true },
  },
  {
    tableName: "TcRemarks",
    timestamps: false,
    primaryKey: false, // explicitly tell Sequelize there is no primary key
  }
);

module.exports = TcRemarks;

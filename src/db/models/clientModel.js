const { Model, DataTypes, Sequelize } = require("sequelize");

const CLIENT_TABLE = "clients";

const ClientSchema = {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

class Client extends Model {
  static associate(models) {
    this.hasMany(models.Branch, {
      as: 'branches',
      foreignKey: 'clientId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CLIENT_TABLE,
      modelName: 'Client',
      timestamps: false
    }
  }
}

module.exports = {
  CLIENT_TABLE,
  ClientSchema,
  Client
}
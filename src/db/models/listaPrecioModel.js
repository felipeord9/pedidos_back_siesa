const { DataTypes, Model } = require("sequelize");
const { LISTA_PRECIO_CO_TABLE } = require("./listaPrecioCoModel");

const LISTA_PRECIO_TABLE = "t112_mc_listas_precios";

const ListaPrecioSchema = {
  idListaPrecio:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "f112_id",
  },
  descripcion:{
    type: DataTypes.STRING,
    field: "f112_descripcion",
  },
  estado:{
    type: DataTypes.INTEGER,
    field: "f112_ind_estado",
  }
};

class ListaPrecio extends Model {
  static associate(models) {
    this.belongsTo(models.ListaPrecioCo, {
      foreignKey: "idListaPrecio",
      as: 'listaCo'
    });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: LISTA_PRECIO_TABLE,
      modelName: "ListaPrecio",
      timestamps: false,
    };
  }
}

module.exports = {
  ListaPrecio,
  ListaPrecioSchema,
  LISTA_PRECIO_TABLE,
};

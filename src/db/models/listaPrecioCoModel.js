const { DataTypes, Model } = require("sequelize");

const LISTA_PRECIO_CO_TABLE = "t1121_mc_listas_precios_co";

const ListaPrecioCoSchema = {
  idListCo:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "f1121_id_lista_precio",
  },
  idCo:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    field: "f1121_id_co",
  },
};

class ListaPrecioCo extends Model {
  static associate(models) {
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: LISTA_PRECIO_CO_TABLE,
      modelName: "ListaPrecioCo",
      timestamps: false,
    };
  }
}

module.exports = {
  ListaPrecioCo,
  ListaPrecioCoSchema,
  LISTA_PRECIO_CO_TABLE,
};

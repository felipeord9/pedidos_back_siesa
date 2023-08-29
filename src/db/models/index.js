const { Cliente, ClienteSchema } = require("./clienteModel");
const { Tercero, TerceroSchema } = require("./terceroModel");
const { Item, ItemSchema } = require("./itemModel");
const { ExtensionItem, ExtensionItemSchema } = require("./extensionItemModel");
const { Vendedor, VendedorSchema } = require("./vendedorModel");
const { Contacto, ContactoSchema } = require("./contactoModel");
const { Agencia, AgenciaSchema } = require("./agenciaModel");

function setupModels(sequelize) {
  Contacto.init(ContactoSchema, Contacto.config(sequelize));
  Agencia.init(AgenciaSchema, Agencia.config(sequelize))
  Cliente.init(ClienteSchema, Cliente.config(sequelize));
  Tercero.init(TerceroSchema, Tercero.config(sequelize));
  Item.init(ItemSchema, Item.config(sequelize));
  ExtensionItem.init(ExtensionItemSchema, ExtensionItem.config(sequelize));
  Vendedor.init(VendedorSchema, Vendedor.config(sequelize));

  Contacto.associate(sequelize.models);
  Agencia.associate(sequelize.models)
  Tercero.associate(sequelize.models);
  Cliente.associate(sequelize.models);
  ExtensionItem.associate(sequelize.models);
  Item.associate(sequelize.models);
  Vendedor.associate(sequelize.models);
}

module.exports = setupModels;

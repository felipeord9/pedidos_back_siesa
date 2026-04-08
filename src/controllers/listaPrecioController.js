const ListaPrecioService = require("../services/listaPrecioService");

const findAllListas = async (req, res, next) => {
  try {
    const data = await ListaPrecioService.find();
    res.status(200).json({
      status: "OK",
      data,
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

const findAllListasCo = async (req, res, next) => {
  try {
    const data = await ListaPrecioService.findCo();
    res.status(200).json({
      status: "OK",
      data,
    });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

module.exports = {
  findAllListas,
  findAllListasCo,
}
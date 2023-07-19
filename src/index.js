const express = require("express");
const cors = require("cors");
const routerApi = require("./v1/routes");
const { config } = require("./config/config");

const { port, host } = config;

const app = express();

const whitelist = [
  'http://pedidos.granlangostino.net:5515/'
]
const corsOptions = {
  origin: function (origin, callback) {
    if(whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(express.json());
app.use(cors(corsOptions));

routerApi(app)

app.listen(port, host, () => {
  console.log(`Server on http://${host}:${port}`);
});

const cors          = require("cors")({ origin: true });
const buildUrl      = require("../helpers/buildUrl");
const validarCidade = require("../helpers/validarCidade");
const fetchApi      = require("../helpers/fetchApi");
const { LANG }      = require("../config");

module.exports = (req, res) => {
  cors(req, res, async () => {
    const query = validarCidade(req, res);
    if (!query) return;

    try {
      const url = buildUrl("/data/2.5/weather?q=", {
        ...query,
        appid: process.env.OPENWEATHER_API_KEY,
        lang: LANG,
      });
      
      const response = await fetchApi(url);
      
      res.status(200).json(response);

    } catch (e) {
      res.status(500).json({ erro: "Erro ao buscar weather", detalhe: e.message });
    }
  });
};
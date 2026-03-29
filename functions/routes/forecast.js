const cors          = require("cors")({ origin: true });
const buildUrl      = require("../helpers/buildUrl");
const validarLatLon = require("../helpers/validarLatLon");
const fetchApi      = require("../helpers/fetchApi");
const { LANG, UNITS } = require("../config");

module.exports = (req, res) => {
  cors(req, res, async () => {
    const params = validarLatLon(req, res);
    if (!params) return;

    const cnt = req.query.cnt ?? 8;

    try {
      const url = buildUrl("/data/2.5/forecast", {
        ...params,
        cnt,
        appid: process.env.OPENWEATHER_API_KEY,
        lang: LANG,
        units: UNITS,
      });

      const response = await fetchApi(url);
     
      res.status(200).json(response);

    } catch (e) {
      res.status(500).json({ erro: "Erro ao buscar forecast", detalhe: e.message });
    }
  });
};
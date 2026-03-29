const cors          = require("cors")({ origin: true });
const buildUrl      = require("../helpers/buildUrl");
const validarLatLon = require("../helpers/validarLatLon");
const fetchApi      = require("../helpers/fetchApi");   

module.exports = (req, res) => {
  cors(req, res, async () => {
    const params = validarLatLon(req, res);
    if (!params) return;

    try {
      const url = buildUrl("/data/2.5/air_pollution", {
        ...params,
        appid: process.env.OPENWEATHER_API_KEY,
      });

      const response = await fetchApi(url);
    
      res.status(200).json(response);

    } catch (e) {
      res.status(500).json({ erro: "Erro ao buscar air pollution", detalhe: e.message });
    }
  });
};
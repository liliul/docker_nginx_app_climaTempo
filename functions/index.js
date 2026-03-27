const { onRequest } = require("firebase-functions/v2/https");
const fetch = require("node-fetch");
const cors = require("cors")({ origin: true });

const BASE_OWM = "https://api.openweathermap.org";
const LANG     = "pt_br";
const UNITS    = "metric";

function buildUrl(endpoint, params) {
  const url = new URL(`${BASE_OWM}${endpoint}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  return url.toString();
}

function validarLatLon(req, res) {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    res.status(400).json({ erro: "lat e lon são obrigatórios" });
    return false;
  }
  return { lat, lon };
}

// ── Rota 1: Weather ───────────────────────────────────────────
exports.weather = onRequest((req, res) => {
  cors(req, res, async () => {
    const params = validarLatLon(req, res);
    if (!params) return;

    try {
      const url = buildUrl("/data/2.5/weather", {
        ...params,
        appid: process.env.OPENWEATHER_API_KEY,
        lang: LANG,
      });

      const response = await fetch(url);
      if (!response.ok) throw new Error(`OWM status: ${response.status}`);

      const data = await response.json();
      res.status(200).json(data);

    } catch (e) {
      res.status(500).json({ erro: "Erro ao buscar weather", detalhe: e.message });
    }
  });
});

// ── Rota 2: Forecast ──────────────────────────────────────────
exports.forecast = onRequest((req, res) => {
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

      const response = await fetch(url);
      if (!response.ok) throw new Error(`OWM status: ${response.status}`);

      const data = await response.json();
      res.status(200).json(data);

    } catch (e) {
      res.status(500).json({ erro: "Erro ao buscar forecast", detalhe: e.message });
    }
  });
});

// ── Rota 3: Air Pollution ─────────────────────────────────────
exports.airPollution = onRequest((req, res) => {
  cors(req, res, async () => {
    const params = validarLatLon(req, res);
    if (!params) return;

    try {
      const url = buildUrl("/data/2.5/air_pollution", {
        ...params,
        appid: process.env.OPENWEATHER_API_KEY,
      });

      const response = await fetch(url);
      if (!response.ok) throw new Error(`OWM status: ${response.status}`);

      const data = await response.json();
      res.status(200).json(data);

    } catch (e) {
      res.status(500).json({ erro: "Erro ao buscar air pollution", detalhe: e.message });
    }
  });
});
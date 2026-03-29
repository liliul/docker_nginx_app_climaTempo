module.exports = function validarLatLon(req, res) {
  const { lat, lon } = req.query;
  if (!lat || !lon) {
    res.status(400).json({ erro: "lat e lon são obrigatorios" });
    return false;
  }
  return { lat, lon };
};
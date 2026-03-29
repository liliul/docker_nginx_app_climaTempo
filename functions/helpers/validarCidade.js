module.exports = function validarCidade(req, res) {
  const { q } = req.query;
  if (!q) {
    res.status(400).json({ erro: "Nome da cidade é obrigatoria" });
    return false;
  }

  return { q } 
}
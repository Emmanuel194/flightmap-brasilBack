const aeronavesService = require('../services/aeronaves.service');

exports.listar = async (req, res) => {
  try {
    const aeronaves = await aeronavesService.listar();
    res.json(aeronaves);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar aeronaves' });
  }
};

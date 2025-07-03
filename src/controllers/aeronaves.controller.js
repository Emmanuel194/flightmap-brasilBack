const aeronavesService = require('../services/aeronaves.service');

exports.listar = async (req, res) => {
  try {
    const filtros = req.query; 
    const aeronaves = await aeronavesService.listar(filtros);
    res.json(aeronaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erro ao buscar aeronaves' });
  }
};

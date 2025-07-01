const db = require('../db');

exports.listar = async () => {
  const result = await db.query('SELECT * FROM aeronaves LIMIT 100');
  return result.rows;
};

const db = require('../db');

exports.listar = async (filtros = {}) => {
  let baseQuery = 'SELECT * FROM aeronaves WHERE 1=1';
  const params = [];
  let i = 1;

  if (filtros.uf) {
    baseQuery += ` AND uf = $${i++}`;
    params.push(filtros.uf.toUpperCase());
  }

  if (filtros.categoria) {
    baseQuery += ` AND categoria = $${i++}`;
    params.push(filtros.categoria.toUpperCase());
  }

  if (filtros.situacao) {
    baseQuery += ` AND situacao = $${i++}`;
    params.push(filtros.situacao.toUpperCase());
  }

  if (filtros.ano_min) {
    baseQuery += ` AND ano_fabricacao >= $${i++}`;
    params.push(parseInt(filtros.ano_min, 10));
  }

  if (filtros.ano_max) {
    baseQuery += ` AND ano_fabricacao <= $${i++}`;
    params.push(parseInt(filtros.ano_max, 10));
  }

  baseQuery += ' LIMIT 100'; 

  const result = await db.query(baseQuery, params);
  return result.rows;
};

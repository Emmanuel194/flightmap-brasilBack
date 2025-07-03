const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const db = require('../src/db');
const readline = require('readline');

const filePath = path.resolve(__dirname, 'dados_aeronaves.csv');


const input = fs.createReadStream(filePath);
const rl = readline.createInterface({ input });

let skippedFirstLine = false;
const filteredStream = new require('stream').PassThrough();

rl.on('line', (line) => {
  if (!skippedFirstLine) {
    skippedFirstLine = true;
    return;
  }
  filteredStream.write(line + '\n');
});

rl.on('close', () => {
  filteredStream.end();

  const aeronaves = [];

  filteredStream
    .pipe(csv({ separator: ';', mapHeaders: ({ header }) => header.trim().replace(/"/g, '') }))
    .on('data', (data) => {
      aeronaves.push({
        prefixo: data['MARCA'],
        fabricante: data['NM_FABRICANTE'],
        modelo: data['DS_MODELO'],
        categoria: data['CD_CATEGORIA'],
        situacao: data['DS_MOTIVO_CANC']?.trim() || 'ATIVA',
        uf: data['SG_UF'],
        ano_fabricacao: parseInt(data['NR_ANO_FABRICACAO']) || null,
      });
    })
    .on('end', async () => {
      console.log(`Importando ${aeronaves.length} registros...`);

      for (const aero of aeronaves) {
        try {
          await db.query(
            `INSERT INTO aeronaves
            (prefixo, fabricante, modelo, categoria, situacao, uf, ano_fabricacao)
            VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              aero.prefixo,
              aero.fabricante,
              aero.modelo,
              aero.categoria,
              aero.situacao,
              aero.uf,
              aero.ano_fabricacao,
            ]
          );
        } catch (error) {
          console.error('Erro ao inserir:', aero.prefixo, error.message);
        }
      }

      console.log('✅ Importação finalizada!');
      process.exit();
    });
});

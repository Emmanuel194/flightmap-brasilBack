const express = require('express');
const cors = require('cors');
require('dotenv').config();

const aeronavesRoutes = require('./routes/aeronaves.routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/aeronaves', aeronavesRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

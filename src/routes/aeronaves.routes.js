const express = require('express');
const router = express.Router();
const aeronavesController = require('../controllers/aeronaves.controller');

router.get('/', aeronavesController.listar);

module.exports = router;

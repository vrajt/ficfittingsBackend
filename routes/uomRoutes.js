const express = require('express');
const router = express.Router();
const controller = require('../controllers/uomController');

router.get('/getAllGsstUom', controller.getAllUOM);

module.exports = router;

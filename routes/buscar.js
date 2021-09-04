const {Router} = require('express');
const{buscar} = require('../controllers/buscar');
const router = Router();

router.get('/:categoria/:producto',buscar);

module.exports = router
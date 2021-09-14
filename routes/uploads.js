const {Router} = require('express');
const {check}= require('express-validator');
const {cargarArchivo, actualizarImg, mostrarImagen}= require ('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');
const { validarArchivo } = require('../middlewares/validar-archivo');
const {validarCampos} = require('../middlewares/validar-campos');
const router = Router();

router.post('/',[validarArchivo],cargarArchivo);

router.put('/:coleccion/:id',[
    validarArchivo,
    check('id',['el id debe ser de mongo']).isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),// se le da cierta flexibilidad 
    validarCampos
],actualizarImg);

router.get('/:coleccion/:id',[check('id',['el id debe ser de mongo']).isMongoId(),
check('coleccion').custom(c => coleccionesPermitidas(c,['usuarios','productos'])),// se le da cierta flexibilidad 
validarCampos
], mostrarImagen);

module.exports = router;
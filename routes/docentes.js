const Router = require('express');
const { check } = require('express-validator');
const { getDocentes, getDocente, addDocente, deleteDocente, updateDocente } = require('../bml/controllers/docentes');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

//getall Docentes
router.get('/', validarJWT, getDocentes);

//Add Docente
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'La edad es requerido').not().isEmpty(),
        check('titulo', 'El titulo es requerido').not().isEmpty(),
        check('tipo', 'El tipo es requerido').not().isEmpty(),
        validarCampos
    ],
    addDocente);

//Update Docente
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('edad', 'La edad es requerido').not().isEmpty(),
    check('titulo', 'El titulo es requerido').not().isEmpty(),
    check('tipo', 'El tipo es requerido').not().isEmpty(),
    validarCampos
], updateDocente);

//Delete Docente
router.delete('/:id', validarJWT, deleteDocente);

//Getbyid Docente
router.get('/:id', validarJWT, getDocente);

module.exports = router;
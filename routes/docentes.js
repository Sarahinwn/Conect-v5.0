const Router = require('express');
const { check } = require('express-validator');
const { getDocentes, getDocente, addDocente, deleteDocente, updateDocente } = require('../bml/controllers/docentes');
const { validarCampos } = require('../bml/middlewares/validar-campos');

const router = Router();

//getall Docentes
router.get('/', getDocentes);

//Add Docente
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'La edad es requerido').not().isEmpty(),
        check('titulo', 'El titulo es requerido').not().isEmpty(),
        check('tipo', 'El tipo es requerido').not().isEmpty(),
        validarCampos
    ],
    addDocente);

//Update Docente
router.put('/:id', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('edad', 'La edad es requerido').not().isEmpty(),
    check('titulo', 'El titulo es requerido').not().isEmpty(),
    check('tipo', 'El tipo es requerido').not().isEmpty(),
    validarCampos
], updateDocente);

//Delete Docente
router.delete('/:id', deleteDocente);

//Getbyid Docente
router.get('/:id', getDocente);

module.exports = router;
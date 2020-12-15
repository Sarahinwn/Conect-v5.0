const Router = require('express');
const { check } = require('express-validator');
const { getMaterias, getMateria, addMateria, deleteMateria, updateMateria } = require('../bml/controllers/materias');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

//getall Materias
router.get('/', validarJWT, getMaterias);

//Add Materia
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('horas', 'Las horas son requeridas').not().isEmpty(),
        check('horasp', 'Las horas P son requeridas').not().isEmpty(),
        check('horast', 'Las horas T son requeridas').not().isEmpty(),
        check('creditos', 'Los creditos son requeridos').not().isEmpty(),
        validarCampos
    ],
    addMateria);

//Update Materia
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('horas', 'Las horas son requeridas').not().isEmpty(),
    check('horasp', 'Las horas P son requeridas').not().isEmpty(),
    check('horast', 'Las horas T son requeridas').not().isEmpty(),
    check('creditos', 'Los creditos son requeridos').not().isEmpty(),
    validarCampos
], updateMateria);

//Delete Nateria
router.delete('/:id', validarJWT, deleteMateria);

//Getbyid Materia
router.get('/:id', validarJWT, getMateria);

module.exports = router;
const Router = require('express');
const { check } = require('express-validator');
const { getAlumnos, getAlumno, addAlumno, deleteAlumno, updateAlumno } = require('../bml/controllers/alumnos');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');

const router = Router();

//getall Alumnos
router.get('/', getAlumnos);

//Add Alumno
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('edad', 'La edad es requerido').not().isEmpty(),
        check('sexo', 'El sexo es requerido').not().isEmpty(),
        check('semestre', 'El semestre es requerido').not().isEmpty(),
        check('carrera', 'La carrera es requerido').not().isEmpty(),
        validarCampos
    ],
    addAlumno);

//Update Alumno
router.put('/:id', [
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('edad', 'La edad es requerido').not().isEmpty(),
    check('sexo', 'El sexo es requerido').not().isEmpty(),
    check('semestre', 'El semestre es requerido').not().isEmpty(),
    check('carrera', 'La carrera es requerido').not().isEmpty(),
    validarCampos
], updateAlumno);

//Delete Alumno
router.delete('/:id', deleteAlumno);

//Getbyid
router.get('/:id', getAlumno);

module.exports = router;
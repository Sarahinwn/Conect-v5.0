const Router = require('express');
const { check } = require('express-validator');
const { getUsuarios, addUsuario, deleteUsuario, getUsuario, updateUsuario } = require('../bml/controllers/usuarios');
const { validarCampos } = require('../bml/middlewares/validar-campos');
const { validarJWT } = require('../bml/middlewares/validar-jwt');
const router = Router();

//getall Usuarios
router.get('/', getUsuarios);


//Add Usuario
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    addUsuario
);

//Update Usuario
router.put('/:id', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    updateUsuario);

//delete Usuario
router.delete('/:id', deleteUsuario);

//Getbyid
router.get('/:id', getUsuario);

module.exports = router;
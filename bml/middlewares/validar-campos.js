const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = (req, res = response, next) => {
    const errores = validationResult(req);

    if (!errores) {
        return res.json({
            status: false,
            message: errores.mapped(),
            data: null
        });
    }
    next();
};

module.exports = {
    validarCampos
};
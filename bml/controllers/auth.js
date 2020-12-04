const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { querySingle } = require('../../dal/data-access');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    let usuario = null;
    const sqlParams = [{
        'name': 'email',
        'value': email
    }];

    usuario = await querySingle('stp_usuarios_login', sqlParams);

    if (!usuario) {
        res.json({
            status: false,
            message: 'Email no encontrado'
        })
    }

    const validPassword = bcrypt.compareSync(password, usuario.password);

    if (!validPassword) {
        return res.json({
            status: false,
            message: 'Acceso correcto',
            data: token
        });
    }

    const token = await generateJWT(usuario.idUsuario);

    res.json({
        status: true,
        message: 'Acceso correcto',
        data: token
    });
}

const googleSignIn = async(req, res = response) => {
    const googleToken = req.body.token;
    let usuario = null;
    let sqlParams = null;

    try {
        const { name, email, picture } = await googleVerify(googleToken);
        console.log(name);
        sqlParams = [{
            'name': 'email',
            'value': email
        }];

        usuario = await querySingle('stp_usuarios_login', sqlParams);

        //verificar si existe en BD
        if (!usuario) {
            //crear usuario
            sqlParams = [{
                    'name': 'nombre',
                    'value': name
                },
                {
                    'name': 'email',
                    'value': email
                },
                {
                    'name': 'password',
                    'value': ''
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'facebook',
                    'value': 0
                },
                {
                    'name': 'nativo',
                    'value': 0
                },
                {
                    'name': 'imagen',
                    'value': picture
                },
            ];

            usuario = await querySingle('stp_usuarios_add', sqlParams);
            console.log(usuario);
        } else {
            //actualizar usuario
            sqlParams = [{
                    'name': 'nombre',
                    'value': usuario.name
                },
                {
                    'name': 'email',
                    'value': usuario.email
                },
                {
                    'name': 'password',
                    'value': usuario.password
                },
                {
                    'name': 'google',
                    'value': 1
                },
                {
                    'name': 'facebook',
                    'value': 0
                },
                {
                    'name': 'nativo',
                    'value': 0
                },
                {
                    'name': 'imagen',
                    'value': usuario.picture
                },
            ];

            usuario = await querySingle('stp_usuarios_update', sqlParams)

        }

        const token = await generateJWT(usuario.idUsuario);

        res.json({
            status: true,
            message: 'Acceso Correcto',
            data: token
        });

    } catch (err) {
        res.json({
            status: false,
            message: 'Acceso Denegado',
            data: token
        });
    }
}
module.exports = {
    login,
    googleSignIn
}
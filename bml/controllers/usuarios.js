const { response } = require('express');
const bcrypt = require('bcryptjs');
const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener usuarios
const getUsuarios = async(req, res) => {
    let usuarios = await query('stp_usuarios_getall');
    if (usuarios) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: usuarios
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar los usuarios',
            data: null
        });
    }
}

//Obtener un Usuario
const getUsuario = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': id
    }];

    let usuario = await querySingle('stp_usuarios_getbyid', sqlParams);
    if (usuario) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: usuario
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar el usuario',
            data: null
        });
    }
}

//Agregar un usuario
const addUsuario = async(req, res) => {

    const { nombre, email, password } = req.body;
    const sqlParam = [{
        'name': 'email',
        'value': email
    }]
    let usuario = await querySingle('stp_usuarios_validemail', sqlParam);
    if (!usuario) {
        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt);

        const sqlParams = [{
                'name': 'nombre',
                'value': nombre
            },
            {
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': newPassword
            },
            {
                'name': 'google',
                'value': 0
            },
            {
                'name': 'facebook',
                'value': 0
            },
            {
                'name': 'nativo',
                'value': 1
            },
            {
                'name': 'imagen',
                'value': ''
            }
        ];


        usuario = await querySingle('stp_usuarios_add', sqlParams);
        console.log(usuario);
        if (usuario) {
            res.json({
                status: true,
                message: 'Usuario agregado exitosamente',
                data: usuario
            });
        } else {
            res.json({
                status: false,
                message: 'Ocurrio un error al agregar el usuario',
                data: null
            });
        }
    } else {
        res.json({
            status: false,
            message: 'Ya existe un usuario con ese email',
            data: null
        })
    }

}

//Actualizar Usuario
const updateUsuario = async(req, res) => {
    const { nombre, email, password } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },
        {
            'name': 'email',
            'value': email
        },
        {
            'name': 'password',
            'value': password
        },
        {
            'name': 'google',
            'value': 0
        },
        {
            'name': 'facebook',
            'value': 0
        },
        {
            'name': 'nativo',
            'value': 1
        },
        {
            'name': 'imagen',
            'value': ''
        }
    ];

    let rowsAffected = await execute('stp_usuarios_update', sqlParams);

    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Usuario actualizado correctamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar el usuario',
            data: null
        });
    }
}

//Eliminar usuario
const deleteUsuario = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idUsuario',
        'value': id
    }];

    let rowsAffected = await execute('stp_usuarios_delete', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Usuario eliminado correctamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar el usuario',
            data: null
        });
    }
}

//cambiar contraseña
const updatePassword = async(req, res) => {
    const { email, password } = req.body;
    const sqlParam = [{
        'name': 'email',
        'value': email
    }];
    let usuario = await querySingle('stp_usuarios_validemail', sqlParam);
    if (usuario) {

        const salt = bcrypt.genSaltSync();
        const newPassword = bcrypt.hashSync(password, salt);
        const sqlParams = [{
                'name': 'email',
                'value': email
            },
            {
                'name': 'password',
                'value': newPassword
            }
        ];
        let rowsAffected = await execute('stp_usuarios_updatepass', sqlParams);
        if (rowsAffected != 0) {
            res.json({
                status: true,
                message: 'Contraseña actualizada correctamente',
                data: rowsAffected
            })
        } else {
            res.json({
                status: false,
                message: 'Ocurrio un error al actualizar contraseña',
                data: null
            })
        }
    } else {
        res.json({
            status: false,
            message: 'No existe un usuario con este email',
            data: null
        });
    }
}


module.exports = {
    getUsuarios,
    getUsuario,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    updatePassword
}
const bcrypt = require('bcryptjs');
const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener docentes
const getDocentes = async(req, res) => {
    let docentes = await query('stp_docentes_getall');
    if (docentes) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: docentes
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar los docentes',
            data: docentes
        });
    }
}

//Obtener un docente
const getDocente = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];

    let docente = await querySingle('stp_docentes_getbyid', sqlParams);
    if (docente) {
        res.json({
            status: true,
            message: 'Cosulta exitosa',
            data: docente
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar el docente',
            data: docente
        });
    }
}

//Agregar un docente
const addDocente = async(req, res) => {
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },

        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    let rowsAffected = await execute('stp_docentes_add', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Docente agregado exitosamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar el docente',
            data: rowsAffected
        });
    }

}

//Actualizar docente
const updateDocente = async(req, res) => {
    const { id } = req.params;
    const { nombre, edad, titulo, tipo } = req.body;
    const sqlParams = [{
            'name': 'idDocente',
            'value': id
        },
        {
            'name': 'nombre',
            'value': nombre
        },

        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'titulo',
            'value': titulo
        },
        {
            'name': 'tipo',
            'value': tipo
        }
    ];

    let rowsAffected = await execute('stp_docentes_update', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Docente actualizado exitosamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar el docente',
            data: rowsAffected
        });
    }
}

//Eliminar docente
const deleteDocente = async(req, res) => {
    const { id } = req.params;

    const sqlParams = [{
        'name': 'idDocente',
        'value': id
    }];

    let rowsAffected = await execute('stp_docentes_delete', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Docente eliminado exitosamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar el docente',
            data: rowsAffected
        });
    }
}

module.exports = {
    getDocentes,
    getDocente,
    addDocente,
    updateDocente,
    deleteDocente
}
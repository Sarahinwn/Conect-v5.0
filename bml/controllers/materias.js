const bcrypt = require('bcryptjs');
const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener materias
const getMaterias = async(req, res) => {
    let materias = await query('stp_materias_getall');
    if (materias) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: materias
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar las materias',
            data: null
        });
    }
}

//Obtener un materia
const getMateria = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idMateria',
        'value': id
    }];

    let materia = await querySingle('stp_materias_getbyid', sqlParams);
    if (materia) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: materia
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar la materia',
            data: null
        });
    }
}

//Agregar una materia
const addMateria = async(req, res) => {
    const { nombre, horas, horasp, horast, creditos } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },

        {
            'name': 'horas',
            'value': horas
        },
        {
            'name': 'horasp',
            'value': horasp
        },
        {
            'name': 'horast',
            'value': horast
        },
        {
            'name': 'creditos',
            'value': creditos
        }
    ];

    let rowsAffected = await execute('stp_materias_add', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Materia agregada exitosamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar la materia',
            data: null
        });
    }

}

//Actualizar Materia
const updateMateria = async(req, res) => {
    const { id } = req.params;
    const { nombre, horas, horasp, horast, creditos } = req.body;
    const sqlParams = [

        {
            'name': 'idMateria',
            'value': id
        },
        {
            'name': 'nombre',
            'value': nombre
        },

        {
            'name': 'horas',
            'value': horas
        },
        {
            'name': 'horasp',
            'value': horasp
        },
        {
            'name': 'horast',
            'value': horast
        },
        {
            'name': 'creditos',
            'value': creditos
        }
    ];

    let rowsAffected = await execute('stp_materias_update', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Materia actualizada exitosamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar la materia',
            data: null
        });
    }
}

//Eliminar Materia
const deleteMateria = async(req, res) => {
    const { id } = req.params;

    const sqlParams = [{
        'name': 'idMateria',
        'value': id
    }];

    let rowsAffected = await execute('stp_materias_delete', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Materia eliminada exitosamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar la materia',
            data: null
        });
    }
}

module.exports = {
    getMaterias,
    getMateria,
    addMateria,
    updateMateria,
    deleteMateria
}
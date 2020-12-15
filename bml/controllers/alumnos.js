const bcrypt = require('bcryptjs');
const { query, querySingle, execute } = require('../../dal/data-access');

//Obtener alumnos
const getAlumnos = async(req, res) => {
    let alumnos = await query('stp_alumnos_getall');
    if (alumnos) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: alumnos
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar los alumnos',
            data: null
        });
    }
}

//Obtener un Usuario
const getAlumno = async(req, res) => {
    const { id } = req.params;
    const sqlParams = [{
        'name': 'idAlumno',
        'value': id
    }];

    let alumno = await querySingle('stp_alumnos_getbyid', sqlParams);
    if (alumno) {
        res.json({
            status: true,
            message: 'Consulta exitosa',
            data: alumno
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al consultar el alumno',
            data: null
        });
    }
}

//Agregar un usuario
const addAlumno = async(req, res) => {
    const { nombre, edad, sexo, semestre, carrera } = req.body;
    const sqlParams = [{
            'name': 'nombre',
            'value': nombre
        },

        {
            'name': 'edad',
            'value': edad
        },
        {
            'name': 'sexo',
            'value': sexo
        },
        {
            'name': 'semestre',
            'value': semestre
        },
        {
            'name': 'carrera',
            'value': carrera
        }
    ];

    let rowsAffected = await execute('stp_alumnos_add', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Alumno agregado exitosamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al agregar el alumno',
            data: null
        });
    }

}

//Actualizar Alumno
const updateAlumno = async(req, res) => {
    const { id } = req.params;
    const { nombre, edad, sexo, semestre, carrera } = req.body;
    const sqlParams = [{
            'name': 'idAlumno',
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
            'name': 'sexo',
            'value': sexo
        },
        {
            'name': 'semestre',
            'value': semestre
        },
        {
            'name': 'carrera',
            'value': carrera
        }
    ];

    let rowsAffected = await execute('stp_alumnos_update', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Alumno actualizado exitosamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al actualizar el alumno',
            data: null
        });
    }
}

//Eliminar Alumno
const deleteAlumno = async(req, res) => {
    const { id } = req.params;

    const sqlParams = [{
        'name': 'idAlumno',
        'value': id
    }];

    let rowsAffected = await execute('stp_alumnos_delete', sqlParams);
    if (rowsAffected != 0) {
        res.json({
            status: true,
            message: 'Alumno eliminado exitosamente',
            data: rowsAffected
        });
    } else {
        res.json({
            status: false,
            message: 'Ocurrio un error al eliminar el alumno',
            data: null
        });
    }
}

module.exports = {
    getAlumnos,
    getAlumno,
    addAlumno,
    updateAlumno,
    deleteAlumno
}
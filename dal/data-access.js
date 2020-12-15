const sql = require('mssql');
const conString = require('./config');

//Query para todos los select
//Execute para los 3 faltantes
const query = async(stpName, sqlParams) => {


    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value)
        });
    }

    const resp = await req.execute(stpName);
    return resp.recordset;
}

const querySingle = async(stpName, sqlParams) => {


        const pool = await sql.connect(conString);
        const req = await pool.request();
        if (typeof sqlParams !== 'undefined') {
            sqlParams.forEach((param) => {
                req.input(param.name, param.value)
            });
        }

        const resp = await req.execute(stpName);
        return resp.recordset[0];
    }
    //Excecute para los otros 3
const execute = async(stpName, sqlParams) => {


    const pool = await sql.connect(conString);
    const req = await pool.request();
    if (typeof sqlParams !== 'undefined') {
        sqlParams.forEach((param) => {
            req.input(param.name, param.value)
        });
    }

    const resp = await req.execute(stpName);
    return resp.rowsAffected;
}

module.exports = {
    query,
    querySingle,
    execute
}
const {check} = require('express-validator')
const {handleValidator} = require('../utils/handleValidator')

const validatorCreateItem = [
    check("nombre").exists().notEmpty(),
    check("departamento").exists().notEmpty(),
    check("piso").exists().notEmpty(),
    check("descripcion").exists().notEmpty(),
    check("marca").exists().notEmpty(),
    check("modelo").exists().notEmpty(),
    check("serial").exists().notEmpty(),
    check("activo").exists().notEmpty(),
    check("condicion").exists().notEmpty(),
    check("precio").exists().notEmpty(),
    check("garantia").exists().notEmpty(),
    check("imagen").exists().notEmpty(),
    (req,res,next) => {
        return handleValidator(req,res,next)
    }, 
];
module.exports = {validatorCreateItem}
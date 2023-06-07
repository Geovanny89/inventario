const {check} = require('express-validator')
const {handleValidator} = require('../utils/handleValidator')

const validatorRegister = [
    check("nombre").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("apellido").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("nombreUsuario").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("cargo").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("email").exists().notEmpty().isEmail(),
    check("contraseña").exists().notEmpty().isLength({ min: 3, max: 15 }),
    (req, res, next) => {
        return handleValidator(req, res, next)
    },
];
const validatorLogin=[
    check("nombreUsuario").exists().notEmpty().isLength({ min: 3, max: 99 }),
    check("contraseña").exists().notEmpty().isLength({ min: 3, max: 15 }),
    (req, res, next) => {
        return handleValidator(req, res, next)
    },
]

module.exports = { validatorRegister,validatorLogin }
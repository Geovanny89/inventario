const {Router}= require("express")

const router = Router();

const product = require('../Routes/Productos/products')
const category = require('../Routes/Categorias/categorias')
const user = require('../Routes/Users/auth')



router.use('/',product);
router.use('/',category);
router.use('/',user);


module.exports= router
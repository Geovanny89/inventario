const { Router } = require("express")
const CategoriaSchema = require('../../database/Categoria');
const checkRol = require("../../Middleware/rol");
const authMiddleware = require("../../Middleware/sesion");
const router = Router();

router.get('/allcategoria',authMiddleware, async (req, res) => {
    try {
        const categori = await CategoriaSchema.find()
        if (!categori) {
            return res.status(404).send("No existen Ccategorias")
        }
        res.status(200).send(categori)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor ")
    }
});
router.get('/cateName',authMiddleware, async (req, res) => {
    try {
        const nombre = req.query.nombre.toLowerCase()
        const categori = await CategoriaSchema.find({nombre: {$regex: new RegExp(nombre, 'i')}})
        const categoryNameList = categori.map(category => category.nombre.toLowerCase())
        if (!categoryNameList.includes(nombre)) {
            return res.status(404).send("No existe Categoria")
        }
        res.status(200).send(categori)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor ")
    }
    
})
router.get('/cate/:id',authMiddleware, async(req,res)=>{
    try {
        const {id}= req.params
        const categoria= await CategoriaSchema.findById(id)
        if(!categoria){
            res.status(404).send("No existe la categoria con ese ID")
            return
        }
        res.status(200).send(categoria)
        
    } catch (error) {
        console.log(error)
        res.status(500).send("error de servidor ")
    }
})

router.post('/categoria',authMiddleware, checkRol(["admin"]), async (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) {
            return res.status(404).send("Faltan datos")
        }
        const product = await CategoriaSchema(req.body);
        product.save()
        res.status(202).send(product)
    } catch (error) {
        console.log(error)
    }
});
router.put('/actcategoria/:id',authMiddleware, checkRol(["admin"]), async (req, res) => {
    try {
        const { id } = req.params
        const categori = await CategoriaSchema.findById(id)
        if (!categori) {
            res.status(404).send("No existe categoria")
            return
        }
        const { nombre } = req.body
        const updateCategori = await CategoriaSchema.findByIdAndUpdate(id, {
            nombre: nombre
        }, { new: true })
        res.status(200).send(updateCategori)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor")
    }
});

router.delete('/deletedCategoria/:id',authMiddleware, checkRol(["admin"]), async (req, res) => {
    try {
        const { id } = req.params
        const categoria = await CategoriaSchema.findById(id)
        if (!categoria) {
            res.status(404).send("No existe categoria con ese ID")
            return
        }
        const deleteProduct = await CategoriaSchema.findByIdAndDelete(id)
        res.status(200).send("Categoria eliminada con éxito ")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor ")
    }
})

module.exports = router;

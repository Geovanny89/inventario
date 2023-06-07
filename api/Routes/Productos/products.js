const { Router } = require("express")
const ProductSchema = require('../../database/Producto');
const UserSchema = require('../../database/Usuarios')
const authMiddleware = require('../../Middleware/sesion')
const checkRol = require('../../Middleware/rol')
const {validatorCreateItem} = require('../../validators/products')
const router = Router();

router.get('/allproduct',async (req, res) => {
    try {
        const producto = await ProductSchema.find().populate('categoria')
        console.log(producto)
        if (!producto) {
            res.status(404).send("No existen productos")
        }
        res.status(200).send(producto)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de Servidor")
    }
})
router.get('/allproductName',authMiddleware, async (req, res) => {
    try {
        const nombre = req.query.nombre.toLowerCase()
        const producto = await ProductSchema.find({nombre: {$regex: new RegExp(nombre, 'i')}}).populate('categoria')
        const productName = producto.map(el=>
            el.nombre.toLowerCase())
            console.log(productName)
        
        if (!productName.includes(nombre)) {
            console.log(nombre)
            return res.status(404).send("No existen productos")
            
        }
        res.status(200).send(producto)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de Servidor")
    }
})
router.get('/allproduct/:id',authMiddleware, async (req, res) => {
    try {
        const {id}= req.params
        const producto = await ProductSchema.findById(id).populate('categoria')
        if (!producto) {
            return res.status(404).send("No existen productos")
        }
        res.status(200).send(producto)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de Servidor")
    }
})
// router.get('/allproduct', async (req, res) => {
//     try {
//         const products = await ProductSchema.find().populate('categoria');
//         if (!products) {
//             res.status(404).send("No existen productos")
//         }
//         res.status(200).json(products);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     }
// });

router.post('/product/:id',validatorCreateItem,authMiddleware,checkRol(["admin"]), async (req, res) => {
    try {
        const {id}=req.params
        const user =await UserSchema.findById(id)
        if(!user){
            res.status(404).send("No existe Usuario con ese ID")
        }
        const product = ProductSchema(req.body);
        console.log(product)
        await product.save()

        user.producto.push(product._id);
        await user.save();

        res.status(200).send(product)
    } catch (error) {
        console.log(error)
    }
});
router.put('/product/:id',authMiddleware,checkRol(["admin"]), async (req, res) => {
    try {
        const { id } = req.params

        const product = await ProductSchema.findById(id)
        if (!product) {
            return res.status(404).send("No existe el producto ")
        }
        const { nombre, departamento, piso, descripcion, marca, modelo, serial, activo, condicion, precio, garantia, imagen, categoria } = req.body

        const updateProduct = await ProductSchema.findByIdAndUpdate(id, {
            nombre: nombre,
            departamento: departamento,
            piso: piso,
            descripcion: descripcion,
            marca: marca,
            modelo: modelo,
            serial: serial,
            activo: activo,
            condicion: condicion,
            precio: precio,
            garantia: garantia,
            imagen: imagen,
            categoria: categoria
        }, { new: true })
        res.status(200).send(updateProduct)
        console.log(updateProduct)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor")
    }
});
router.delete('/productDelete/:id',authMiddleware,checkRol(["admin"]), async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductSchema.findById(id)
        if (!product) {
            return res.status(404).send("No existe producto con ese ID")
        }
        const deleteProduct = await ProductSchema.findByIdAndDelete(product)
        res.status(200).send("Producto eliminado con éxito")
    } catch (error) {
        console.log(error)
        res.status(500).send("Error de servidor")
    }
})


module.exports = router;

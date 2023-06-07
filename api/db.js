
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Conexion Exitosa')
})
.catch((error)=> console.log(error))

module.exports ={connection : mongoose}
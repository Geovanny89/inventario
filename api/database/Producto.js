const {mongoose,Schema} = require('mongoose')

const ProductSchema = mongoose.Schema({
   nombre:{
    type:String
   } ,
   departamento:{
    type: String
   },
   piso:{
    type:Number
   },
   descripcion:{
    type:String
   },
   marca:{
    type:String
   },
   modelo:{
    type:String
   },
   serial:{
    type:String
   },
   activo:{
    type:String
   },
   condicion:{
    type:String
   },
   precio:{
    type:Number
   },
   garantia:{
    type:String
   },
   imagen:{
      type:String
   },
   
   categoria: [{  type: Schema.Types.ObjectId, ref: "categoria" }]

},{ timestamps:true,versionKey: false })

module.exports = mongoose.model('product',ProductSchema)
const {mongoose,Schema} = require('mongoose')

const CategoriaSchema = mongoose.Schema({
    nombre:{
        type:String
    },
    
},{ timestamps:true,versionKey: false })

module.exports = mongoose.model('categoria',CategoriaSchema)
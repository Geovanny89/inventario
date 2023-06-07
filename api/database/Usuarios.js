const {mongoose, Schema }= require('mongoose')

const UserSchema = mongoose.Schema({
    nombre:{
        type:String
    },
    apellido:{
        type:String
    },
    imagen:{
        type:String
    },
    nombreUsuario:{
        type:String
    },
    cargo:{
        type:String
    },
    email:{
        type:String
    },
    contraseña:{
        type:String
    },
    rol:{
        type:["user","admin"],
        default:"user"
    },
    producto:[{type: Schema.Types.ObjectId, ref: "product" }]
},{timestamps:true, versionKey: false })

module.exports= mongoose.model('usuarios', UserSchema);
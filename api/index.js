require('dotenv').config()
const {CLIENT_URL, JWT_SECRET}= process.env
const bodyParser= require('body-parser')
const express = require('express')
const routes= require('./Routes/index')
const app =express()
const cors = require('cors');
const cookieParser = require("cookie-parser");
const { verifyToken } = require('./utils/handleJwt')
const User = require('../api/database/Usuarios')
//const authMiddleware = require('./Middleware/sesion')


app.get('/',(req,res)=>{
    res.send("Bienvenidos")
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
    cors({
        origin: CLIENT_URL, // <-- location of the react app were connecting to
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
        allowedHeaders: ['Content-Type', 'x-user-session'],     //Se usa para enviar los datos de sesión desde el front al middleware del back
    })
);

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", CLIENT_URL);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(cookieParser(JWT_SECRET));


app.use(express.json());

// app.get("/getSession", async (req,res)=>{
// const token = JSON.parse(req.headers["x-user-session"]);
// try {
//     if(token){
//         const session = await verifyToken(token)
     
//         const user = await User.findById(session._id)
//         res.status(200).json({user}) 
//         }
//           else{
//         res.status(401).json({error:"Sesion no activa"})
//        }
    
// } catch (error) {
//     console.log(error)
//     res.status(500).json({error: "Error al obtener la sesion"})
// }
   
// })

app.use('/',routes)

require('./db')


const PORT = process.env.port || 3001
app.listen(PORT,()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
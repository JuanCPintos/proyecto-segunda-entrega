//Ruta de Registro
//registro/login
//registro/home

const express = require('express');
const router = express.Router();

const {
    registrarNuevoUsuario
} = require('../controllers/registroController.js');

//Rutas
// router.get('/home', (req, res)=>{
//     res.send(`<h1>Bienvenido/a a la App Administrador/a</h1>`);
// });

router.post('/inicio', registrarNuevoUsuario);


// router.put('/update/:id', (req,res)=>{

//     let registro = req.params.id;

//     console.log(`El id recibido es ${registro}`);
    
//     res.send(`<h1>registro Actualizado ${registro}</h1>`);
// })


// router.delete('/delete/:id', (req,res)=>{

//     let registro = req.params.id;

//     console.log(`El id recibido es ${registro}`);

//     res.send(`<h1>registro Eliminado ${registro}</h1>`);
// })

//exportamos el modulo router
module.exports = router;
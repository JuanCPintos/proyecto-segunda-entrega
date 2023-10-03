
//Ruta de Usuarios
//usuario/login
//usuario/home

const express = require('express');
const router = express.Router();


const {
    iniciarSesion
} = require('../controllers/userController.js');

//Rutas
router.get('/home', (req, res)=>{
    res.send(`<h1>Bienvenido/a a la App Administrador/a</h1>`);
});

router.post('/login', iniciarSesion);


router.put('/update/:id', (req,res)=>{

    let usuario = req.params.id;

    console.log(`El id recibido es ${usuario}`);
    
    res.send(`<h1>Usuario Actualizado ${usuario}</h1>`);
})


router.delete('/delete/:id', (req,res)=>{

    let usuario = req.params.id;

    console.log(`El id recibido es ${usuario}`);

    res.send(`<h1>Usuario Eliminado ${usuario}</h1>`);
})

//exportamos el modulo router
module.exports = router;
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 10;
//creamos una url o path para la conexión local
const Mongo_Url_Local = process.env.Mongo_Url_Local;

const emailAdmin = process.env.email_admin;
const passAdmin = process.env.pass_admin;

const verificarPassword = (contrasena, hash) => {
    
    const match = bcrypt.compare(contrasena, hash);
    return match;
}

//CRUD de Productos

const client = new MongoClient(Mongo_Url_Local);

const iniciarSesion = async(req, res) =>{
    let email = req.body.email;
    let password = req.body.password;
    
    try {
        
        if(email == '' || password == ''){
            console.log('Campos incompletos');
        } else if (email == emailAdmin && password == passAdmin){
            res.redirect('/productos.html');
        } else {
            await client.connect();
            console.log(`Conectado a la db!!!`);
    
            const db = client.db('miwebeit');
            
            let usuarioBuscado = {
                email : email
            }
    
            //seleccionamos una colección
            const collection = db.collection('usuarios');
            let documento = await collection.find(usuarioBuscado).toArray();
    
            passwordEncriptada = documento.map(objeto =>{
                return objeto.password
            })

            // console.log(passwordEncriptada[0]);

            let condicion = await verificarPassword(password, passwordEncriptada[0]);

            if(condicion){
                res.send(`<h1>Bienvenido Usuario</h1>`)
            }
        }

    } catch (error) {
        console.log(error);
    }finally{
        await client.close();
        console.log('Conexion cerrada');
    }



}


module.exports = {
    iniciarSesion
}
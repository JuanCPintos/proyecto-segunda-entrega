const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcrypt');
const saltRounds = 10;
//creamos una url o path para la conexión local
const Mongo_Url_Local = process.env.Mongo_Url_Local;


//CRUD de Productos

const client = new MongoClient(Mongo_Url_Local);

const encriptarPassword = (password) => {
    const newPassword = bcrypt.hash(password, saltRounds);
    return newPassword;
}



const registrarNuevoUsuario = async (req, res) => {
    let id = req.params.id;
    let nombre = req.body.user;
    let email = req.body.email;
    let password = await encriptarPassword(req.body.password);
    
    // console.log(password);

    let idData = {_id : new ObjectId(id)};
    let usuarios = []
    try{
        await client.connect();
        console.log(`Conectado a la db!!!`);

        const db = client.db('miwebeit');
    
        //seleccionamos una colección
        const collection = db.collection('usuarios');
        let documento = await collection.find({}).toArray();
        // console.log('Documentos encontrados: ', documento);
        usuarios = documento.map(objeto =>{
            return objeto.email
        })
        if(usuarios.includes(email)){
            console.log(`Email existente: ${email}`);
        }else{
            console.log('se registraaa!!');
            let insertarDato = {
                nombre: nombre,
                email: email,
                password: password
            }
            await collection.insertOne(insertarDato);
            console.log('Documento insertado con éxito:', insertarDato);

        }

    } catch(error){
        console.log(error);
    }finally{
        await client.close();
        console.log('Conexion cerrada');
    }
    // console.log(usuarios);
    

}


module.exports = {
    registrarNuevoUsuario
}
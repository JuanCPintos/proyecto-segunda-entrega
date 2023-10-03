const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

//creamos una url o path para la conexión local
const Mongo_Url_Local = process.env.Mongo_Url_Local;

// const Mongo_Url_Atlas = process.env.Mongo_Url_Atlas;
//Creamos los controladores de mi App
//creamos funciones para respondera las rutas

//CRUD de Productos

const client = new MongoClient(Mongo_Url_Local);

//1. Create (Crear / INSERT)
const agregarProductos = async (req,res) =>{

    console.log(req.body);
    
    let nombre = req.body.nombre;
    let stock = req.body.stock;
    
    console.log(`Recibimos los Productos y son: ${nombre} - ${stock}`);

    //todo lo de la data
    
    try{
        await client.connect();
        console.log(`Conectado a la db!!!`);

        const db = client.db('miwebeit');
    
        //seleccionamos una colección
        const collection = db.collection('estudiantes');
    
        //creamos un objeto con los datos a insertar
        let insertarDato = {
            nombre: nombre,
            stock: stock
        }
        const insertResult = await collection.insertOne(insertarDato);
        console.log('Documento insertado con éxito:', insertarDato.insertedId);
        
    } catch (e){
        console.error('Error: ', e);
    }finally{
        await client.close();
        console.log('Conexion cerrada');
    }
}


//2. Read (Leer / FIND)
const listarProductos = async (req, res) => {

    try{
        await client.connect();
        console.log(`Conectado a la db!!!`);

        const db = client.db('miwebeit');
    
        //seleccionamos una colección
        const collection = db.collection('estudiantes');

        const documents = await collection.find({}).toArray();
        console.log('Documentos encontrados: ', documents);

    } catch (e){
        console.error('Error: ', e);
    } finally{
        await client.close();
        console.log('Conexion cerrada');
    }
}


//3. Update (Actualizar / UPDATE)
const actualizarProductos = async (req,res) =>{
    let id = req.params.id;
    let nombre = req.body.nombre;
    let stock = req.body.stock;
    let idData = { _id: new ObjectId(id)}
    
    // console.log(req.body);

    // console.log(`El id recibido es ${idData}`);

    try{
        await client.connect();
        console.log(`Conectado a la db!!!`);

        const db = client.db('miwebeit');
    
        //seleccionamos una colección
        const collection = db.collection('estudiantes');
        
        let actualizado = {
            $set: {
                nombre: nombre,
                stock: stock,
            }
        }
        const resultado = await collection.updateOne(idData, actualizado);

        if (resultado.modifiedCount === 1) {
            console.log('Producto actualizado con éxito');
        } else {
            console.log('No se encontró el producto o no se realizó ninguna actualización');
        }
            
    }catch (e){
        console.error('Error: ', e);
    } finally{
        await client.close();
        console.log('Conexion cerrada');
        res.send(`<h1>Producto Actualizado ${id}</h1>`);
    }

}


//4. Delete (Eliminar / DELETE)
const eliminarProductos = async(req,res) => {
    let id = req.params.id;
    let nombre = req.body.nombre;
    let stock = req.body.stock;
    let idData = { _id: new ObjectId(id)}

    try{
        await client.connect();
        console.log(`Conectado a la db!!!`);

        const db = client.db('miwebeit');
    
        //seleccionamos una colección
        const collection = db.collection('estudiantes');

        const resultado = await collection.deleteOne(idData);

        if (resultado.deletedCount === 1) {
            console.log('Producto eliminado con éxito');
            console.log(`Hemos eliminado ${resultado.deletedCount} dato/s`);
            res.send(`<h1>Producto Eliminado ${idData._id}</h1>`);
        } else {
            console.log('No se encontró el producto para eliminar');
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        // Cerrar la conexión a la base de datos al finalizar
        await client.close();
        console.log('Conexión a la base de datos cerrada');
    }
}

module.exports = {
    listarProductos,
    agregarProductos,
    actualizarProductos,
    eliminarProductos
}




const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.path = {
            usuarios : '/api/usuarios',
            auth : '/api/auth',
            productos : '/api/productos',
            categorias : '/api/categorias',
            buscar : '/api/buscar' ,
            uploads : '/api/uploads'
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público para servir el contenido
        this.app.use( express.static('public') );

        this.app.use(fileUpload({ // para aceptar archivos desde una peticion 
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath : true
        }));

    }

    routes() {
        
        this.app.use( this.path.auth, require('../routes/auth'));
        this.app.use( this.path.usuarios, require('../routes/usuarios'));
        this.app.use( this.path.categorias, require('../routes/categorias'));
        this.app.use( this.path.productos, require('../routes/productos'));
        this.app.use( this.path.buscar, require('../routes/buscar'));
        this.app.use( this.path.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;

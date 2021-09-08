const { response } = require("express");

const {Usuario,Categoria,Producto} = require('../models');
const {ObjectId}= require("mongoose").Types;
const coleccionesPermitidas = [ // para validar colecciones 
'usuarios',
'categorias',
'productos',
'roles'

];
const buscarUsuarios = async (termino = '',res)=>{
    
    const ismongoid = await ObjectId.isValid(termino);
        
if (ismongoid) {
    const usuario = await Usuario.findById(termino);
    return res.status(200).json({results : (usuario ) ? [usuario] : []});
}

};

const buscar=(req,res=response)=>{
    const {coleccion,termino}=req.params;
    
    if (!coleccionesPermitidas.includes(coleccion)) {
        
        return res.status(400).json({msg:"la coleccion no existe"});
    }
    
    switch (coleccion) {
        case  'usuarios' :
        
            buscarUsuarios(termino,res);
        break

        case  'categorias':
        break;
        case 'productos':
        
        break;
    }

    
    
}



module.exports = {
    buscar
}
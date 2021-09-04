const { response } = require("express")


const buscar=(req,res=response)=>{
    const {categoria,producto}=req.params;

    res.status(200).json({categoria,producto})
}



module.exports = {
    buscar
}
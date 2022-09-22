const usuario = require("../models/usuario");
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');




const validarToken = async(req,resp) =>{

     resp.json({
        "token": req.token
     });

};

const login = async(req,resp) =>{

    try{

        const {email,password} = req.body;

        const usuarioDB= await Usuario.findOne({email});

        if(!usuarioDB){
            return resp.status(404).json({
                "msg":"usuario no encontrado"
            });
        }

        //validar password


        const validPassword = bcrypt.compareSync(password,usuarioDB.password);


        if(!validPassword){
            return resp.status(400).json({
                "msg":"Peticion invalida"
            });
        }

        const token = await generarJWT(usuarioDB.id);


        resp.json({
            "token":token
        });


    }catch(error){
        resp.status(500).json({
            "msg":"Error interno"
        });
    }
}


module.exports= {
    login,
    validarToken
}
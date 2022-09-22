const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async(req,resp) =>{

    const usuarios = await Usuario.find();

    const uuid = req.uuid;

    resp.json({
       usuarios,
       uuid
    });

};


const crearUsuario = async(req,resp) =>{

    const {email,password} = req.body;

    try{

        const existe = await Usuario.findOne({ email });

        if(existe){
            return resp.status(400).json({
                "msg":"El email ya esta registrado"
            });
        }


        const usuario = new Usuario(req.body);

        //encriptando contraseña

         const salt = bcrypt.genSaltSync();

         usuario.password = bcrypt.hashSync(password,salt);

        await usuario.save();

        const token = await generarJWT(usuario.id);
    
        resp.json({
           "msg":"creando usuario",
           "usuario":usuario,
           "token":token
        });

    }catch(error){
         resp.status(500).json({
            "msg":"validar logs en el servidor",
            error
         });
    }
   
};


const actualizarUsuario = async (req, res = response) => {

    // TODO: Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;


    try {

        const usuarioDB = await Usuario.findById( uid );

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;

        if ( usuarioDB.email !== email ) {

            const existeEmail = await Usuario.findOne({ email });
            if ( existeEmail ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }
        
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true } );

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}


module.exports = {
     getUsuarios,
     crearUsuario,
     actualizarUsuario
}
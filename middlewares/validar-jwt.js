const jwt = require('jsonwebtoken');

const validarJWT = (req,resp,next) =>{


    const token = req.header('token');

    console.log(token);

    if(!token){
        return resp.status(401).json({
            "msg":"invalid token"
        });
    }


    try{

        const uuid = jwt.verify(token,process.env.JWT_SECRET);

        req.uuid = uuid;
        req.token = token;

    }
    catch(error){
        return resp.status(401).json({
            "msg":"invalid token"
        });
    }

    next();
}



module.exports = {
    validarJWT
}
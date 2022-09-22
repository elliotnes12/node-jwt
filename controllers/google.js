

const auth2 = (req,resp) =>{

    const {token} = req.body;

    resp.json({
        "msg":"exito"
    });

};


module.exports ={
    auth2
}
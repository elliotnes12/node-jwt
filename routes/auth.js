const Router = require('express');
const { login, validarToken  } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/',[
     check('email').isEmail(),
     check('password').not().isEmpty(),
     validarCampos
],login);


router.get('/renew',validarJWT,validarToken);


module.exports = router;

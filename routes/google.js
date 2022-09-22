const {Router} = require('express');
const { auth2 } = require('../controllers/google');
const router = Router();

router.post('/',auth2);



module.exports = router;
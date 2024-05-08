const express = require('express');
const router = express.Router();
const { InfoController, UserController } = require('../controllers/index.js');


router.get('/info',InfoController.info);

router.post('/signup',UserController.signup);


module.exports = router;


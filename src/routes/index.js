const express = require('express');
const router = express.Router();
const { InfoController, UserController } = require('../controllers/index.js');
const { UserMiddleware } = require('../middlewares/index.js');


router.get('/info',InfoController.info);

router.post('/signup',UserController.signup);
router.post('/login',UserController.login);

// protecting users route with jsonwebtoken extraction and verification 
router.get('/users',UserMiddleware.checkUserAuthRequest,UserController.getAllUsers);
router.get('/users/:id',UserMiddleware.checkUserAuthRequest,UserController.getUser);


module.exports = router;


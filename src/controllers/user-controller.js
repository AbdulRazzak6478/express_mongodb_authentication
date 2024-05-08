
const { UserService  } = require('../services');
const { StatusCodes } = require('http-status-codes');
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function signup(req, res){
    try {
        const data = req.body;
        const response = await UserService.signup({
            username : req.body.username,
            email: req.body.email,
            password : req.body.password
        });
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
        
    } catch (error) {
        console.log('user controller signup user error : ',error);
        ErrorResponse.error = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
async function login(req, res){
    try {
        const data = req.body;
        console.log('user req obj :',req.body);
        const response = await UserService.login({
            email : req.body.email,
            password: req.body.password
        });

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('user controller signin user error : ',error);
        ErrorResponse.error = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getAllUsers(req,res){
    try {
        const data = req.body;
        const response = await UserService.getAllUsers();

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('user controller get all users error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getUser(req,res){
    try {
        // const data = req.body;
        const response = await UserService.getUser(req.params.id);

        SuccessResponse.data = response;
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        console.log('user controller get  user error : ',error);
        ErrorResponse.data = error;
        return res.status(error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
module.exports = {
    signup,
    login,
    getAllUsers,
    getUser
}
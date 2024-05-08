const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const AppError = require("../utils/errors/app-error");
const { UserService } = require("../services");


function validateUserRequest(req, res, next) {

  if (!req.body.username) {
    ErrorResponse.message = "Something went wrong while creating user";
    ErrorResponse.error = new AppError(
      ["username not found in the request "],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.email) {
    ErrorResponse.message = "Something went wrong while creating user";
    ErrorResponse.error = new AppError(
      ["email not found in the request "],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  if (!req.body.password) {
    ErrorResponse.message = "Something went wrong while creating user";
    ErrorResponse.error = new AppError(
      [
        "password not found in the request",
      ],
      StatusCodes.BAD_REQUEST
    );
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
  }
  next();
}


async function checkUserAuthRequest (req, res, next){
    try {
        const bearerHeader = req.headers['auth-access-token'];
        if(typeof bearerHeader !=='undefined')
        {
          const bearer = bearerHeader.split(' ');
          const bearerToken = bearer[1];
          const response = await UserService.isAuthenticated(bearerToken);
          if(response)
          {
            console.log('user authenticated',response);
            req.body.id = response;
            next();
          }
        }
        else{
          console.log('no headers and tokens');
          throw new AppError(['auth-access-token = bearer [token] , jwt token is missing'],StatusCodes.BAD_REQUEST)
        }
      } catch (error) {
        ErrorResponse.error = error;
        return res.status(error?.statusCode).json(ErrorResponse);
      }
}
module.exports = {
    validateUserRequest,
    checkUserAuthRequest,
}

const { UserRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');
const bcryptjs = require('bcryptjs');
const { Auth } = require('../utils/common');
const userRepository = new UserRepository();


async function signup(data)
{
    try {
        const {username, email, password} = data;
        console.log('request data : ',data);

        // checking if user is exist or not
        const isUser = await userRepository.getUserByEmail(data.email);

        console.log('user before signup : ',isUser)
        if(isUser.length != 0)
        {
            console.log('User is already exist ');
            return { exist:true,message : `User with ${data.email} is already exist `}
        }
        
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser_Payload = {
            username,
            email,
            password:hashedPassword,
        };
    
        // creating new user
        const user = await userRepository.create(newUser_Payload);
        console.log('user created :',user);

        return user;
    } catch (error) {
        console.log('user service signup user error :',error);
        throw new AppError(`Cannot SignUp the user , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function login(data)
{
    try {
        // get user by email to check its present or not
        const user = await userRepository.getUserByEmail(data.email);
        console.log('user details : ',user.length);
        console.log('user details : ',user[0]);
        const encryptedPassword = user[0]?.password;
        console.log('encry : ',encryptedPassword);
        if(user.length == 0)
        {
            throw new AppError(`No user found `,StatusCodes.BAD_REQUEST)
        }

        const isPassword_Correct = await Auth.checkPassword(data.password,encryptedPassword);

        if(!isPassword_Correct)
        {
            console.log('incorrect password from signin service');
            throw new AppError(`incorrect password `,StatusCodes.BAD_REQUEST)
        }
        const userData = {
            id : user[0].id,
            email : user[0].email,
            username : user[0].username,
        }
        console.log('user payload ',userData);
        const input = {
            id : user[0].id,
            email : user[0].email
        }
        const token = await Auth.createToken(input);

        return {userData,token};

    } catch (error) {
        console.log('user service signup user error :',error);
        throw new AppError(`Not able to signin the user , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    } 
}

async function getAllUsers()
{
    try {
        const users = await userRepository.getAll();
        console.log('users : ',users);

        return users;
    } catch (error) {
        console.log('user service getAll users  error :',error);
        throw new AppError(`Not able to get the users , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getUser(id)
{
    try {
        const user = await userRepository.get(id);
        console.log('user : ',user);

        return user;
    } catch (error) {
        console.log('user service get user  error :',error);
        throw new AppError(`Not able to get the user , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function isAuthenticated(token)
{
    try {
        if(!token)
        {
            throw new AppError('auth-access-token : bearer token ,missing jwt token',StatusCodes.BAD_REQUEST);
        }
        const response = Auth.verifyToken(token);
        console.log('verify token : ',response);
        const user = await userRepository.get(response.id);
        if(!user)
        {
            throw new AppError('no user found',StatusCodes.BAD_REQUEST);
        }
        return user.id; 
    } catch (error) {
        if(error.name == 'JsonWebTokenError')
        {
            throw new AppError('Invalid jwt token',StatusCodes.BAD_REQUEST);
        }
        if(error.name == 'TokenExpiredError')
        {
            throw new AppError('jwt token expired',StatusCodes.BAD_REQUEST);
        }
        console.log('user service signin authenticated :',error.message);
        throw new AppError(`Something went wrong , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    signup,
    login,
    getAllUsers,
    getUser,
    isAuthenticated
}
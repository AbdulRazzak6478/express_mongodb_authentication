const { UserRepository } = require('../repositories');
const { StatusCodes } = require('http-status-codes');
const AppError = require('../utils/errors/app-error');


const userRepository = new UserRepository();


async function signup(data)
{
    try {
        // checking if user is exist or not
        const isUser = await userRepository.getUserByEmail(data.email);

        console.log('user before signup : ',isUser)
        if(isUser.length != 0)
        {
            console.log('User is already exist ');
            return { exist:true,message : `User with ${data.email} is already exist `}
        }
           
        // creating new user
        const user = await userRepository.create(data);
        console.log('user created :',user);

        return user;
    } catch (error) {
        console.log('user service signup user error :',error);
        throw new AppError(`Cannot SignUp the user , ${error?.message}`,error?.statusCode ? error.statusCode :StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    signup,
}
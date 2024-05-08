const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { ServerConfig }  = require('../../config');

async function checkPassword(plainPassword, encryptedPassword){
    try {
        const validatedPassword = await bcryptjs.compare(plainPassword,encryptedPassword);
        return validatedPassword;
    } catch (error) {
        console.log('check password ',error);
        throw error;
    }
}

async function createToken(input)
{
    try {
        console.log('private ,secret key : ',ServerConfig.JWT_SECRET,ServerConfig.JWT_EXPIRY);
        const token = await jwt.sign(input,ServerConfig.JWT_SECRET,{expiresIn:ServerConfig.JWT_EXPIRY});
        return token;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    checkPassword,
    createToken,
}
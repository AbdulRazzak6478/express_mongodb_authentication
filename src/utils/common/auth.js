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
        const token = await jwt.sign(input,ServerConfig.JWT_SECRET,{expiresIn:ServerConfig.JWT_EXPIRY});
        return token;
    } catch (error) {
        throw error;
    }
}

function verifyToken(token){
    try {
        return jwt.verify(token,ServerConfig.JWT_SECRET);
    } catch (error) {
        console.log('verifytoken error ',error.message,error.name);
        throw error;
    }
}
module.exports = {
    checkPassword,
    createToken,
    verifyToken
}
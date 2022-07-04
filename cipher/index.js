const {publicEncrypt, privateDecrypt} = require("crypto");

// Create a wrapper function that returns another function that encrypts messages with a fixed public key 
const encryptMaker = (publicKey) => {
    return (message) => {
        const bufferMessage = Buffer.from(message, 'utf-8'); // The message could also be a string
        return publicEncrypt(publicKey, message); // The encryption function is selected based on the type of key provided
    };
};

// Create a wrapper function that returns another function that decrypts messages with a fixed private key 
const decryptMaker = (privateKey) => {
    return (encryptedMessage) => {
        return privateDecrypt(privateKey, encryptedMessage); // The decryption function is selected based on the type of key provided
    };
};

module.exports = {
    encryptMaker,
    decryptMaker
};
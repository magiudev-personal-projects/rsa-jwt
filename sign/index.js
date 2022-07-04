const {privateEncrypt, publicDecrypt, createHash} = require("crypto");

// Create a function to hash data
function genHash (data, hashingFunction) {
    const dataAsAString = JSON.stringify(data);
    const hash = createHash(hashingFunction);
    hash.update(dataAsAString);
    return hash.digest('hex');
};

// Create a wrapper function that returns another function that signs messages with a fixed private key 
const signMaker = (privateKey) => {
    return (message) => {
        const bufferMessage = Buffer.from(message, 'utf-8'); // The message could also be a string
        return privateEncrypt(privateKey, message); // The encryption function is selected based on the type of key provided
    };
};

// Create a wrapper function that returns another function that verifies signed messages using fixed public key
const verifySignMaker = (privateKey) => {
    return (signedMessage) => {
        return publicDecrypt(privateKey, signedMessage); // The decryption function is selected based on the type of key provided
    };
};

module.exports = {
    genHash,
    signMaker,
    verifySignMaker
}
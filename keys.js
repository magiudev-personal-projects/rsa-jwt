const {generateKeyPairSync} = require('crypto');

// Create a function to generate RSA public and private keys
function genRsaKeys () {
    return generateKeyPairSync('rsa',{
        modulusLength: 4096, // Standard key size in bits
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem' // When PEM encoding was selected, the respective key will be a string, otherwise it will be a buffer containing the data encoded as DER.
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        }
    });
}

module.exports = genRsaKeys;
const {encryptMaker, decryptMaker} = require(".");
const genRsaKeys = require("../keys");

const {publicKey, privateKey} = genRsaKeys();
const encrypt = encryptMaker(publicKey);
const decrypt = decryptMaker(privateKey);

const message = "Top secret";
const encryptedMessage = encrypt(message);
const decryptedMessage = decrypt(encryptedMessage);

console.log("Original message: ", message);
console.log("Encrypted message: ", encryptedMessage.toString());
console.log("Decrypted message: ", decryptedMessage.toString());




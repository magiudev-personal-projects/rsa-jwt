const {genHash, signMaker, verifySignMaker} = require(".");
const genRsaKeys = require("../keys");

const {publicKey, privateKey} = genRsaKeys();
const sign = signMaker(privateKey);
const verifySign = verifySignMaker(publicKey);

const data = {
    id: "213",
    name: "John",
    lastName: "Doe"
};

const hashedData = genHash(data, "sha256"); // The data is hashed to avoid sending very heavy data
const signedData = sign(hashedData);
const verificationResult = verifySign(signedData);
console.log(verificationResult.toString() === hashedData);

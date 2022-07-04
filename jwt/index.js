const {createSign, createVerify} = require("crypto");

const signMaker = (privateKey, hashFnAdnSignAlg, returnFormat) => {
    return (data) => {
        const sign = createSign(hashFnAdnSignAlg);
        sign.write(data);
        sign.end();
        return sign.sign(privateKey, returnFormat);
    };
};

const verifyMaker = (publicKey, hashFnAdnSignAlg, returnFormat) => {
    return (data, signature) => {
        const sign = createVerify(hashFnAdnSignAlg);
        sign.write(data);
        sign.end();
        return sign.verify(publicKey, signature,returnFormat);
    };
};

module.exports = {
    signMaker,
    verifyMaker
}
const base64url = require("base64url");
const genRsaKeys = require("../keys");
const {signMaker, verifyMaker} = require(".");

// Get keys
const {privateKey, publicKey} = genRsaKeys();

// Set up signature and verify functions
const signFn = signMaker(privateKey, "RSA-SHA256", "base64");
const verifyFn = verifyMaker(publicKey, "RSA-SHA256", "base64");

const header = {
    alg: "RS256", //  RSA + SHA256 = RSA256 = RSA-SHA256 = RS256
    typ: "JWT"
};
const payload = {
    sub: "1234567890",
    name: "John Doe",
    admin: true,
    iat: 1516239022
};

// Encode the data in base64url format to be able to send url friendly information
const base64UrlHeader = base64url(JSON.stringify(header)); 
const base64UrlPayload = base64url(JSON.stringify(payload));

// Sign the data
const base64SignedData = signFn(base64UrlHeader + "." + base64UrlPayload);

// Format and send data
const base64UrlSignedData = base64url.fromBase64(base64SignedData);
const jwt = base64UrlHeader + "." + base64UrlPayload + "." + base64UrlSignedData;

// Get data
const [
    recievedHeader,
    receivedPayload,
    receivedSignedData
] = jwt.split(".");

// Verify signature
const retirevedBase64SignedData = base64url.toBase64(receivedSignedData);
const result = verifyFn(recievedHeader + "." + receivedPayload, retirevedBase64SignedData);

console.log(result);

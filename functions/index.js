const {helloWorld, testConnection} = require("./src/handlers/health");
const {sendBidInEmail} = require("./src/handlers/sendBidInEmail");
const {getCurrentBidData} = require("./src/handlers/getCurrentBidData");

exports.helloWorld = helloWorld;
exports.testConnection = testConnection;
exports.sendBidInEmail = sendBidInEmail;
exports.getCurrentBidData = getCurrentBidData;

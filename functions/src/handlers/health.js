const functions = require("firebase-functions");

const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

const testConnection = functions.https.onCall(() => {
  return "Connection is OK";
});

module.exports = {
  helloWorld,
  testConnection,
};

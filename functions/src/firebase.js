const admin = require("firebase-admin");

admin.initializeApp();

const db = admin.firestore();
const companiesCollection = db.collection("companies");

module.exports = {
  admin,
  db,
  companiesCollection,
};

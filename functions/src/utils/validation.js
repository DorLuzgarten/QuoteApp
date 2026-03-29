const {HttpsError} = require("firebase-functions/v1/https");

function readRequiredString(value, fieldName) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new HttpsError(
        "invalid-argument",
        `${fieldName} must be a non-empty string.`,
    );
  }

  return value.trim();
}

function getSnapshotData(snapshot, label) {
  if (!snapshot.exists) {
    throw new HttpsError("not-found", `${label} was not found.`);
  }

  return snapshot.data();
}

function pickString(data, key) {
  return typeof data[key] === "string" ? data[key] : "";
}

module.exports = {
  getSnapshotData,
  pickString,
  readRequiredString,
};

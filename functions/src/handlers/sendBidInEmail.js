const functions = require("firebase-functions");
const {HttpsError} = require("firebase-functions/v1/https");
const {sgMail} = require("../config");
const {buildBidUrl} = require("../utils/bids");
const {readRequiredString} = require("../utils/validation");

const sendBidInEmail = functions.https.onCall(async (data) => {
  const payload = data || {};
  const clientMail = readRequiredString(payload.clientMail, "clientMail");
  const tenantId = readRequiredString(payload.tenantId, "tenantId");
  const tenantName = readRequiredString(payload.tenantName, "tenantName");
  const bidDocId = readRequiredString(payload.bidDocId, "bidDocId");
  const creator = readRequiredString(payload.creator, "creator");
  const bidUrl = buildBidUrl(tenantId, bidDocId, creator);

  const message = {
    to: clientMail,
    from: "dor.appdev@gmail.com",
    subject: `×”×¦×¢×ª ×ž×—×™×¨ ×ž×—×‘×¨×ª ${tenantName}`,
    text: `×©×œ×•×, ×ž×ž×ª×™× ×” ×œ×š ×”×¦×¢×ª ×ž×—×™×¨ ×—×“×©×”: ${bidUrl}`,
    html: `<strong>${bidUrl}</strong>`,
  };

  try {
    await sgMail.send(message);
  } catch (error) {
    functions.logger.error("Failed to send bid email.", {
      tenantId,
      bidDocId,
      creator,
      clientMail,
      error,
    });
    throw new HttpsError("internal", "Failed to send bid email.");
  }

  functions.logger.info("Bid email sent.", {
    tenantId,
    bidDocId,
    creator,
    clientMail,
  });

  return {success: true};
});

module.exports = {
  sendBidInEmail,
};

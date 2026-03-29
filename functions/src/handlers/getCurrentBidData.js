const functions = require("firebase-functions");
const {HttpsError} = require("firebase-functions/v1/https");
const cors = require("cors")({origin: true});
const {companiesCollection} = require("../firebase");
const {
  getSnapshotData,
  pickString,
  readRequiredString,
} = require("../utils/validation");

const getCurrentBidData = functions.https.onRequest(async (req, res) => {
  return cors(req, res, async () => {
    if (req.method !== "GET") {
      return res.status(405).json({error: "Method not allowed."});
    }

    try {
      const tenantId = readRequiredString(req.query.tenant, "tenant");
      const bidId = readRequiredString(req.query.bid, "bid");
      const creatorId = readRequiredString(req.query.creator, "creator");

      const [bidSnapshot, tenantSnapshot, creatorSnapshot] = await Promise.all([
        companiesCollection.doc(tenantId).collection("bids").doc(bidId).get(),
        companiesCollection.doc(tenantId).get(),
        companiesCollection.doc(tenantId)
            .collection("users")
            .doc(creatorId)
            .get(),
      ]);

      const bidData = getSnapshotData(bidSnapshot, "Bid");
      const tenantData = getSnapshotData(tenantSnapshot, "Company");
      const creatorData = getSnapshotData(creatorSnapshot, "Creator");

      return res.status(200).json({
        companyName: pickString(tenantData, "companyName"),
        companyAddress: pickString(tenantData, "companyAddress"),
        companyMail: pickString(tenantData, "companyMail"),
        companyWebsite: pickString(tenantData, "companyWebsite"),
        companyLogo: pickString(tenantData, "logoImageUrl"),
        companyPhone: pickString(tenantData, "companyPhone"),
        bidId: pickString(bidData, "bidId"),
        createdBy: pickString(bidData, "createdBy"),
        clientMail: pickString(bidData, "clientMail"),
        clientName: pickString(bidData, "clientName"),
        finalPrice: bidData.finalPrice === undefined ? null : bidData.finalPrice,
        dateCreated: bidData.date === undefined ? null : bidData.date,
        selectedProduct:
          bidData.selectedProducts === undefined ? null : bidData.selectedProducts,
        creatorName: pickString(creatorData, "name"),
        creatorPhone: pickString(creatorData, "phoneNumber"),
        creatorMail: pickString(creatorData, "email"),
      });
    } catch (error) {
      if (error instanceof HttpsError) {
        const statusCode = error.code === "not-found" ? 404 : 400;
        return res.status(statusCode).json({error: error.message});
      }

      functions.logger.error("Failed to fetch bid data.", {error});
      return res.status(500).json({error: "Internal server error."});
    }
  });
});

module.exports = {
  getCurrentBidData,
};

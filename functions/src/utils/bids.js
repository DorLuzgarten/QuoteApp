const {webAppUrl} = require("../config");

function buildBidUrl(tenantId, bidDocId, creator) {
  const url = new URL("/", webAppUrl);
  url.searchParams.set("tenant", tenantId);
  url.searchParams.set("bid", bidDocId);
  url.searchParams.set("creator", creator);

  return url.toString();
}

module.exports = {
  buildBidUrl,
};

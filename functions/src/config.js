const sgMail = require("@sendgrid/mail");
const secret = require("../secret");

const webAppUrl = secret.WEB_APP_URL;

sgMail.setApiKey(secret.SENDGRID_API_KEY);

module.exports = {
  sgMail,
  webAppUrl,
};

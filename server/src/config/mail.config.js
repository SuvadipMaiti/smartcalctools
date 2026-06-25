const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const fs = require('fs');
const ejs = require('ejs');
const util = require('util');

// Create OAuth2 client with your credentials
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_MAIL_CLIENT_ID,
  process.env.GOOGLE_MAIL_SECRET_ID,
  'https://developers.google.com/oauthplayground' // Redirect URI
);

// Generate an access token with refresh token
oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_MAIL_REFRESH_TOKEN,
});

// Create Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_MAIL,
    clientId: process.env.GOOGLE_MAIL_CLIENT_ID,
    clientSecret: process.env.GOOGLE_MAIL_SECRET_ID,
    refreshToken: process.env.GOOGLE_MAIL_REFRESH_TOKEN,
    accessToken: oauth2Client.getAccessToken(),
  },
});

const readFileAsync = util.promisify(fs.readFile);

//  forgot password otp send
// Read the EJS template file
const forgotPasswordOtpTemp = async () => {
  try {
    return await readFileAsync('src/pages/mail/forgotPasswordOtp.ejs', 'utf8');
  } catch (error) {
    console.error('Error reading EJS template:', error);
    return null;
  }
};

//  account activation
// Read the EJS template file
const accountActivationTemp = async () => {
  try {
    return await readFileAsync('src/pages/mail/accountActivation.ejs', 'utf8');
  } catch (error) {
    console.error('Error reading EJS template:', error);
    return null;
  }
};



module.exports.forgotPasswordOtpTemp = forgotPasswordOtpTemp;
module.exports.accountActivationTemp = accountActivationTemp;
module.exports.transporter = transporter;

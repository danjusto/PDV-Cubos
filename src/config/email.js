const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "in-v3.mailjet.com",
  port: 587,
  secure: false,
  auth: {
    user: "c5690a7de0297663283606af68512603",
    pass: "bcc3918fce788fa969ce83055e887175",
  },
});


module.exports = transporter
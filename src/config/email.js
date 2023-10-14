const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: 'testador.email.sender@gmail.com',
    pass: 'xsmtpsib-e7f4381db87d6f533b691ad27c6ba21db576eba71be4577f67d4542c5fe9f00a-KGvOVd86CDzj49M3',
  },
});

module.exports = transporter;

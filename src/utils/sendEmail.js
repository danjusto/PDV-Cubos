const transporter = require('../config/email.js');
const htmlCompile = require('./htmlCompile.js');

const sendEmail = async (clientName, email, orderId, total) => {
  const html = await htmlCompile('./src/templates/orders.html', {
    clientName,
    orderId,
    total,
  });
  await transporter.sendMail({
    from: '"Neyvelopers" <testador.email.sender@gmail.com',
    to: email,
    subject: 'Pedido Neyvelopers',
    html: html,
  });
};

module.exports = sendEmail;

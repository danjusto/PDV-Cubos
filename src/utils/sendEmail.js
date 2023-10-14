const transporter = require('../config/email.js');

const sendEmail = async (cliente, email) => {
  await transporter.sendMail({
    from: '"Neyvelopers" <testador.email.sender@gmail.com',
    to: email,
    subject: 'Pedido Neyvelopers',
    text: `Olá, ${cliente}. Pedido efetuado com sucesso`,
  });
};

module.exports = sendEmail;

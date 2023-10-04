const AppError = require('../errors/AppError');
const { findClients } = require('../repositories/clientRepository');

const executeListClients = async () => {
  const userClients = await findClients();
  if (!userClients) {
    throw new AppError('Clients not found.', 404);
  }
  return userClients[0];
};

module.exports = { executeListClients };

const AppError = require('../errors/AppError');
const {
  findClients,
  findClientByid,
} = require('../repositories/clientRepository');
const filterNullProps = require('../utils/filterClientNulls');

const executeListClients = async () => {
  const userClients = await findClients();
  const filteredClients = userClients.map((client) => {
    return filterNullProps(client);
  });

  return filteredClients;
};

const executeDetailClient = async (id) => {
  const client = await findClientByid(id);
  if (!client) {
    throw new AppError('Client not found.', 404);
  }

  return filterNullProps(client);
};

module.exports = { executeListClients, executeDetailClient };

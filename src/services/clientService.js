const AppError = require('../errors/AppError');
const {
  findClients,
  findClientByid,
} = require('../repositories/clientRepository');

const executeListClients = async () => {
  const userClients = await findClients();
  const filteredClients = userClients.map((client) => {
    const editedClient = {};

    for (const key in client) {
      if (client[key] !== null) {
        editedClient[key] = client[key];
      }
    }
    return editedClient;
  });

  return filteredClients;
};

const executeDetailClient = async (id) => {
  const client = await findClientByid(id);
  if (!client) {
    throw new AppError('Client not found.', 404);
  }

  const editedClient = {};

  for (const key in client) {
    if (client[key] !== null) {
      editedClient[key] = client[key];
    }
  }
  return editedClient;
};

module.exports = { executeListClients, executeDetailClient };

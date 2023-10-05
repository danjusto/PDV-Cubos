const { findByEmailOrCPF, getClientById } = require('../repositories/clientRepository.js')
const { insertClient, updateClient } = require('../repositories/clientRepository.js')
const AppError = require('../errors/AppError');

const executeCreate = async (nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {

  const checkClientExists = await findByEmailOrCPF(email, cpf);
  if (checkClientExists) {
    throw new AppError('Client already exists.', 400);
  }

  const clientCreated = await insertClient(nome, email, cpf, cep, rua, numero, bairro, cidade, estado);
  return clientCreated[0];
};

const executeUpdate = async (id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
  const clientById = await getClientById(id);
  if (!clientById) {
    throw new AppError('Client not found.', 404);
  };


  const clientUpdated = await updateClient(id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado);
};


module.exports = {
  executeCreate,
  executeUpdate,
};

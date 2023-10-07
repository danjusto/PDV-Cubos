const { findByEmailOrCPF, getClientById, findByEmailAndDifferentId, findByCpfAndDifferentId } = require('../repositories/clientRepository.js')
const { insertClient, updateClient, findClients, findClientByid } = require('../repositories/clientRepository.js')
const filterNullProps = require('../utils/filterClientNulls');
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
  const checkEmailAndDifferentId = await findByEmailAndDifferentId(email, id);
  if (checkEmailAndDifferentId) {
    throw new AppError('Email already exists.', 400);
  }

  const checkCpfAndDifferentId = await findByCpfAndDifferentId(cpf, id);
  if (checkCpfAndDifferentId) {
    throw new AppError('CPF already exists.', 400);
  }

  const clientUpdated = await updateClient(id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado);
  return clientUpdated[0];
};

const executeList = async () => {
  const userClients = await findClients();
  const filteredClients = userClients.map((client) => {
    return filterNullProps(client);
  });

  return filteredClients;
};

const executeDetail = async (id) => {
  const client = await findClientByid(id);
  if (!client) {
    throw new AppError('Client not found.', 404);
  }

  return filterNullProps(client);
};

module.exports = {
  executeCreate,
  executeUpdate,
  executeList,
  executeDetail
};

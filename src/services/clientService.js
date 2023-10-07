const { findByEmailOrCPF, findByEmailAndDifferentId, findByCpfAndDifferentId, insert, update, findAll, findById } = require('../repositories/clientRepository.js');
const filterNullProps = require('../utils/filterClientNulls');
const AppError = require('../errors/AppError');

const executeCreate = async (nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
  const checkClientExists = await findByEmailOrCPF(email, cpf);
  if (checkClientExists) {
    throw new AppError('Client already exists.', 400);
  }
  const createdClient = await insert(nome, email, cpf, cep, rua, numero, bairro, cidade, estado);
  return filterNullProps(createdClient[0]);
};

const executeUpdate = async (id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado) => {
  const clientById = await findById(id);
  if (!clientById) {
    throw new AppError('Client not found.', 404);
  }
  const checkEmailAndDifferentId = await findByEmailAndDifferentId(email, id);
  if (checkEmailAndDifferentId) {
    throw new AppError('Email already exists.', 400);
  }
  const checkCpfAndDifferentId = await findByCpfAndDifferentId(cpf, id);
  if (checkCpfAndDifferentId) {
    throw new AppError('CPF already exists.', 400);
  }
  await update(id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado);
};

const executeList = async () => {
  const userClients = await findAll();
  const filteredClients = userClients.map((client) => {
    return filterNullProps(client);
  });
  return filteredClients;
};

const executeDetail = async (id) => {
  const client = await findById(id);
  if (!client) {
    throw new AppError('Client not found.', 404);
  }
  return filterNullProps(client);
};

module.exports = { executeCreate, executeUpdate, executeList, executeDetail };

const bcrypt = require('bcrypt');
const {
  findByEmail,
  insertUser,
  findUserById,
} = require('../repositories/userRepository');
const AppError = require('../errors/AppError');

const executeCreate = async (nome, email, senha) => {
  const checkEmailExists = await findByEmail(email);
  if (checkEmailExists) {
    throw new AppError('Email already exists.', 400);
  }
  const encryptPassword = await bcrypt.hash(senha, 10);
  const userCreated = await insertUser(nome, email, encryptPassword);
  return userCreated[0];
};

const executeUserDetail = async (id) => {
  const userLogged = await findUserById(id);
  if (!userLogged[0]) {
    throw new AppError('Usuário não encontrado.', 404); // ou 403 Forbidden?
  }
  return userLogged[0];
};

module.exports = { executeCreate, executeUserDetail };

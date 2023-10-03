const bcrypt = require('bcrypt');
const { findByEmail, findByEmailAndDifferentId, insertUser, updateUser, getUserById } = require('../repositories/userRepository');
const AppError = require('../errors/AppError');
const { generateToken } = require('../utils/auth');

const executeCreate = async (nome, email, senha) => {
  const checkEmailExists = await findByEmail(email);
  if (checkEmailExists) {
    throw new AppError('Email already exists.', 400);
  }
  const encryptPassword = await bcrypt.hash(senha, 10);
  const userCreated = await insertUser(nome, email, encryptPassword);
  return userCreated[0];
};

const executeUpdate = async (id, nome, email, senha) => {
  const checkEmailExists = await findByEmailAndDifferentId(email, id);
  if (checkEmailExists) {
    throw new AppError('Email already exists.', 400);
  }
  const encryptPassword = await bcrypt.hash(senha, 10);
  await updateUser(id, nome, email, encryptPassword);
};

const executeUserDetail = async (id) => {
  const userLogged = await getUserById(id);
  if (!userLogged) {
    throw new AppError('User not found.', 404);
  }
  return userLogged;
}

const executeLogin = async (email, senha) => {
  const userExists = await findByEmail(email);
  if (!userExists) {
    throw new AppError('Invalid email and/or password.', 401);
  }
  const passwordMatch = await bcrypt.compare(senha, userExists.senha);
  if (!passwordMatch) {
    throw new AppError('Invalid email and/or password.', 401)
  }
  return generateToken(userExists.id);
}

module.exports = { executeCreate, executeUpdate, executeUserDetail, executeLogin };

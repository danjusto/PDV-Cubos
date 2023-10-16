const bcrypt = require('bcrypt');
const { findByEmail, findByEmailAndDifferentId, insert, update, findById } = require('../repositories/userRepository');
const AppError = require('../errors/AppError');
const { generateToken } = require('../utils/auth');

const executeCreate = async (nome, email, senha) => {
  const checkEmailExists = await findByEmail(email);
  if (checkEmailExists) {
    throw new AppError('Email already exists.', 400);
  }
  const encryptPassword = await bcrypt.hash(senha, 10);
  const createdUser = await insert(nome, email, encryptPassword);
  return createdUser[0];
};

const executeUpdate = async (id, nome, email, senha) => {
  const checkEmailExists = await findByEmailAndDifferentId(email, id);
  if (checkEmailExists) {
    throw new AppError('Email already exists.', 400);
  }
  const encryptPassword = await bcrypt.hash(senha, 10);
  await update(id, nome, email, encryptPassword);
};

const executeDetail = async (id) => {
  const user = await findById(id);
  if (!user) {
    throw new AppError('User not found.', 404);
  }
  return user;
};

const executeLogin = async (email, senha) => {
  const user = await findByEmail(email);
  if (!user) {
    throw new AppError('Invalid email and/or password.', 401);
  }
  const passwordMatch = await bcrypt.compare(senha, user.senha);
  if (!passwordMatch) {
    throw new AppError('Invalid email and/or password.', 401);
  }
  return generateToken(user.id);
};

module.exports = { executeCreate, executeUpdate, executeDetail, executeLogin };

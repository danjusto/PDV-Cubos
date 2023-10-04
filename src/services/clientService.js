const { findByEmail} = require('../repositories/clientRepository.js')
const { insertClient } = require('../repositories/clientRepository.js')
const AppError = require('../errors/AppError');

const executeCreate = async (nome, email, cpf) => {
  console.log('Service executeCreate')
  const checkEmailExists = await findByEmail(email);
  console.log(checkEmailExists)
  /* const checkcpfExists = await findBycpf(cpf);
  console.log(checkcpfExists) */
  if (checkEmailExists) {
    throw new AppError('Email already exists.', 400);
  }
  /* if (checkcpfExists) {
    throw new AppError('cpf already exists.', 400);
  } */
  const clientCreated = await insertClient(nome, email, cpf);
  return clientCreated[0];
};


module.exports = { executeCreate };

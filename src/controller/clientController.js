const { executeCreate, executeUpdate, executeList, executeDetail } = require('../services/clientService.js');
const AppError = require('../errors/AppError');

const createClient = async (req, res) => {
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
  try {
    const createdClient = await executeCreate(nome, email, cpf, cep, rua, numero, bairro, cidade, estado);
    return res.status(201).json(createdClient);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

const updateClient = async (req, res) => {
  const { id } = req.params;
  const { nome, email, cpf, cep, rua, numero, bairro, cidade, estado } = req.body;
  try {
    await executeUpdate(id, nome, email, cpf, cep, rua, numero, bairro, cidade, estado);
    return res.status(204).json();
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

const listClients = async (req, res) => {
  try {
    const clients = await executeList();
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

const detailClient = async (req, res) => {
  const { id } = req.params;
  try {
    const clientData = await executeDetail(id);
    return res.status(200).json(clientData);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { createClient, updateClient, listClients, detailClient };

const AppError = require('../errors/AppError');
const {
  executeListClients,
  executeDetailClient,
} = require('../services/clientService');

const listClients = async (req, res) => {
  try {
    const clients = await executeListClients();
    return res.status(200).json(clients);
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

const clientDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const clientData = await executeDetailClient(id);
    return res.status(200).json(clientData);
  } catch (error) {
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { listClients, clientDetail };

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

module.exports = { listClients };

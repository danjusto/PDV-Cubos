const createUser = async (req, res) => {
  const { nome, email, senha } = req.body;
  return res.status(201).json({nome, email, senha});
};

module.exports = { createUser };
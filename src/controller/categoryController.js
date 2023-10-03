const { executeList } = require('../services/categoryService');

const listCategories = async (req, res) => {
  try {
    const list = await executeList();
    return res.status(200).json(list);
  } catch (error) {
    return res.status(500).json({ message: "Server error." });
  }
};

module.exports = { listCategories };
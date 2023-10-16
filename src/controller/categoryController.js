const { executeList } = require('../services/categoryService');

const listCategories = async (req, res) => {
  try {
    const categories = await executeList();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { listCategories };

const { findAll } = require('../repositories/categoryRepository');

const executeList = async () => {
    return await findAll();
}

module.exports = { executeList }
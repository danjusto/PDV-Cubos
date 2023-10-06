const validateCategoryIdParams = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.query)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
}

module.exports = validateCategoryIdParams;
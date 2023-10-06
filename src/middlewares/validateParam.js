const validateIdParams = (schema) => async (req, res, next) => {
    try {
        await schema.validateAsync(req.params)
        next()
    } catch (error) {
        return res.status(400).json({ message: error.message})
    }
}

module.exports = validateIdParams;
const Joi = require('joi');

const categoriaIdQueryParam = Joi.object({
  categoria_id: Joi.string()
    .pattern(/^[0-9]+$/)
    .messages({
      'string.pattern.base': 'The query param categoria_id must be a positive number.',
    }),
});

const clienteIdQueryParam = Joi.object({
  cliente_id: Joi.string()
    .pattern(/^[0-9]+$/)
    .messages({
      'string.pattern.base': 'The query param cliente_id must be a positive number.',
    }),
});

module.exports = { categoriaIdQueryParam, clienteIdQueryParam };

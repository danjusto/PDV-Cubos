const Joi = require('joi');

const order = Joi.object({
  cliente_id: Joi.number().integer().positive().required().messages({
    'any.required': 'The field cliente_id is required.',
    'number.base': 'The value must be a number.',
    'number.integer': 'The value must be a integer.',
    'number.positive': 'The value must be positive.',
  }),
  observacao: Joi.string().messages({
    'string.base': 'The field observacao must be a text.',
    'string.empty': 'The field observacao cannot be empty.',
  }),
  pedido_produtos: Joi.array().items(
    Joi.object({
      produto_id: Joi.number().integer().positive().required().messages({
        'any.required': 'The field produto_id is required.',
        'number.base': 'The value must be a number.',
        'number.integer': 'The value must be a integer.',
        'number.positive': 'The value must be positive.',
      }),
      quantidade_produto: Joi.number().integer().positive().required().messages({
        'any.required': 'The field quantidade_produto is required.',
        'number.base': 'The value must be a number.',
        'number.integer': 'The value must be a integer.',
        'number.positive': 'The value must be positive.',
      }),
    })
  ),
});

module.exports = order;

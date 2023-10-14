const Joi = require('joi');

const product = Joi.object({
  descricao: Joi.string().required().messages({
    'any.required': 'The field descricao is required',
    'string.base': 'The field descricao must be a text',
    'string.empty': 'The field descricao cannot be empty',
  }),
  quantidade_estoque: Joi.number().integer().positive().required().messages({
    'any.required': 'The field quantidade_estoque is required',
    'number.base': 'The value must be a number',
    'number.integer': 'The value must be a integer',
    'number.positive': 'The value must be positive',
  }),
  valor: Joi.number().integer().positive().required().messages({
    'any.required': 'The field senha is required',
    'number.base': 'The value must be a number',
    'number.integer': 'The value must be a integer',
    'number.positive': 'The value must be positive',
  }),
  categoria_id: Joi.number().integer().positive().required().messages({
    'any.required': 'The field senha is required',
    'number.base': 'The value must be a number',
    'number.integer': 'The value must be a integer',
    'number.positive': 'The value must be positive',
  }),
});

module.exports = product;

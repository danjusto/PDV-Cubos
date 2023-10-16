const Joi = require('joi');

const client = Joi.object({
  nome: Joi.string().required().messages({
    'any.required': 'The field nome is required',
    'string.base': 'The field nome must be a text',
    'string.empty': 'The field nome cannot be empty',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'The field email is required.',
    'string.base': 'Invalid email.',
    'string.empty': 'The field email cannot be empty.',
    'string.email': 'Invalid email.',
  }),
  cpf: Joi.string()
    .required()
    .pattern(/^\d{11}$/)
    .messages({
      'any.required': 'The field cpf is required.',
      'string.empty': 'The field cpf cannot be empty.',
      'string.pattern.base': 'The field cpf must be a number with 11 digits.',
    }),
  cep: Joi.string()
    .pattern(/^\d{8}$/)
    .messages({
      'string.pattern.base': 'The field cep must be a number with 8 digits.',
      'string.empty': 'The field cep cannot be empty.',
    }),
  rua: Joi.string().messages({
    'string.base': 'The field rua must be a text.',
    'string.empty': 'The field rua cannot be empty.',
  }),
  numero: Joi.string().messages({
    'string.base': 'The field numero must be a text.',
    'string.empty': 'The field numero cannot be empty.',
  }),
  bairro: Joi.string().messages({
    'string.base': 'The field bairro must be a text.',
    'string.empty': 'The field bairro cannot be empty.',
  }),
  cidade: Joi.string().messages({
    'string.base': 'The field cidade must be a text.',
    'string.empty': 'The field cidade cannot be empty.',
  }),
  estado: Joi.string().messages({
    'string.base': 'The field estado must be a text.',
    'string.empty': 'The field estado cannot be empty.',
  }),
});

module.exports = client;

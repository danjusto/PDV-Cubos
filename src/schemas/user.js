const Joi = require('joi')

const user = Joi.object({
  nome: Joi.string().required().messages({
    'any.required': 'The field nome is required',
    'string.base': 'The field nome must be a text',
  }),
  email: Joi.string().email().required().messages({
    'any.required': 'The field email is required',
    'string.base': 'Invalid email',
    'string.email': 'Invalid email',
  }),
  senha: Joi.string().min(6).required().messages({
    'any.required': 'The field senha is required',
    'string.base': 'The password must contain valid characters',
    'string.min': 'The password must at least 6 characters',
  }),
})

const loginUser = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'The field email is required',
    'string.base': 'Invalid email',
    'string.email': 'Invalid email',
  }),
  senha: Joi.string().min(6).required().messages({
    'any.required': 'The field senha is required',
    'string.base': 'The password must contain valid characters',
    'string.min': 'The password must at least 6 characters',
  }),
})

module.exports = { user, loginUser }
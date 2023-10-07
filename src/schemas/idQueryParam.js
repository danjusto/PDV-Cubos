const Joi = require('joi');

const idQueryParam = Joi.object({
  categoria_id: Joi.string()
    .pattern(/^[0-9]+$/)
    .messages({
      'string.pattern.base': 'The param id must be a number',
    }),
});

module.exports = idQueryParam;

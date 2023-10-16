const Joi = require('joi');

const idParam = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9]+$/)
    .messages({
      'string.pattern.base': 'The param id must be a number.',
    }),
});

module.exports = idParam;

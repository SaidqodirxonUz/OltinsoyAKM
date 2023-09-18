const Joi = require("joi");

exports.postBooksSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});
exports.patchBooksSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});

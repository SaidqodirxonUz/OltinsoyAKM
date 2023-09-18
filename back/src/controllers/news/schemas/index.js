const Joi = require("joi");

patchNewsSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
});

postNewsSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  //0
});

getNewsSchema = Joi.object({
  title: Joi.string(),
  description: Joi.string(),
  desc_en: Joi.string(),
});
module.exports = {
  patchNewsSchema,
  postNewsSchema,
  getNewsSchema,
};

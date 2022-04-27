const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const scheme = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return scheme.validate(data);
};

const loginValidation = (data) => {
  const scheme = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });

  return scheme.validate(data);
};

const noteValidation = (data) => {
  const scheme = Joi.object({
    title: Joi.string().min(6).required(),
    content: Joi.string().min(6).required(),
    description: Joi.string().min(6).required(),
    category: Joi.string().min(6).required(),
  });

  return scheme.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.noteValidation = noteValidation;

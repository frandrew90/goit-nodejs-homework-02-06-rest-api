const joi = require("joi");

const { ValidationError } = require("../helpers/errors");

const contactsValidation = (req, res, next) => {
  const validationSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    phone: joi.string().min(10).max(25).required(),
    favorite: joi.boolean(),
  });

  const validationResult = validationSchema.validate(req.body);
  if (validationResult.error) {
    next(new ValidationError(validationResult.error.details));
  }

  next();
};

module.exports = { contactsValidation };

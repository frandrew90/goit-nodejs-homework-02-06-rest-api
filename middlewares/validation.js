/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable object-curly-spacing */

const joi = require("joi");

const validation = (req, res, next) => {
  const validationSchema = joi.object({
    name: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email({ minDomainSegments: 2 }).required(),
    phone: joi.string().min(10).max(25).required(),
  });

  const validationResult = validationSchema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.details });
  }

  next();
};

module.exports = validation;

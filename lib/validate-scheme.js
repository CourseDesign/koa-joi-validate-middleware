function validateScheme(request, scheme) {
  const Joi = require('./joi').get();

  return () => {
    if (scheme) {
      const validateRes = Joi.validate(request, scheme);
      if (validateRes.error) throw validateRes.error;
    }
  };
}

module.exports = validateScheme;

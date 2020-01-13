const joi = require('./joi');
const createValidate = require('./validate-schema');

module.exports = {
  joi, create: createValidate,
};

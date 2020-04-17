const createValidate = require('./create-validate');
const validateMiddleware = require('joi-validate-middleware');
const paramsExtractor = require('koa-params-extractor');

module.exports = {
  create: createValidate,
  validator: validateMiddleware,
  paramsExtractor: paramsExtractor,
};

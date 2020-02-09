const validateMiddleware = require('joi-validate-middleware');
const paramsExtractor = require('koa-params-extractor');
const defaultErrorCallback = require('./default-error-callback');

function createValidate(schema, errorCallback = defaultErrorCallback) {
  const validate = validateMiddleware.create(schema);

  return async function (ctx, next) {
    try {
      validate(paramsExtractor.extract(ctx));
      await next()
    } catch (e) {
      await errorCallback(ctx, e);
    }
  };
}

module.exports = createValidate;

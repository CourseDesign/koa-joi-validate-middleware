const validateMiddleware = require('joi-validate-middleware');
const paramsExtractor = require('koa-params-extractor');
const defaultErrorCallback = require('./default-error-callback');

function createValidate(schema, errorCallback = defaultErrorCallback) {
  const validate = validateMiddleware.create(schema);

  return async function (ctx, next) {
    let success = false;
    try {
      validate(paramsExtractor.extract(ctx));
      success = true;
    } catch (e) {
      await errorCallback(ctx, e);
    }

    if (success) await next();
  };
}

module.exports = createValidate;

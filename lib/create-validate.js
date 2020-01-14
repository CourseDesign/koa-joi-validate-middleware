const validateMiddleware = require('joi-validate-middleware');
const defaultErrorCallback = require('./default-error-callback');

function createValidate(schema, errorCallback = defaultErrorCallback) {
  const validate = validateMiddleware.create(schema);

  return async function (ctx, next) {
    const request = {};

    if (ctx.request.headers) request.headers = ctx.request.headers;
    else if (ctx.req.headers) request.headers = ctx.req.headers;

    if (ctx.params) request.params = ctx.params;

    if (ctx.request.query) request.query = ctx.request.query;
    else if (ctx.req.query) request.query = ctx.req.query;

    if (ctx.request.body) request.body = ctx.request.body;
    else if (ctx.req.body) request.body = ctx.req.body;

    if (ctx.files) request.files = ctx.req.files;

    let success = false;
    try {
      validate(request);
      success = true;
    } catch (e) {
      await errorCallback(ctx, e);
    }

    if (success) await next();
  };
}

module.exports = createValidate;

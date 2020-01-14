const validateMiddleware = require('joi-validate-middleware');
const defaultErrorCallback = require('./default-error-callback');

function createValidate(schema, errorCallback = defaultErrorCallback) {
  const validate = validateMiddleware.create(schema);

  return async function (ctx, next) {
    const request = {};

    if (ctx.headers) request.headers = ctx.headers;
    else if (ctx.req && ctx.req.headers) request.headers = ctx.req.headers;
    else if (ctx.request && ctx.request.headers) request.headers = ctx.request.headers;

    if (ctx.params) request.params = ctx.params;
    else if (ctx.req && ctx.req.params) request.params = ctx.req.params;
    else if (ctx.request && ctx.request.params) request.params = ctx.request.params;

    if (ctx.query) request.query = ctx.query;
    else if (ctx.req && ctx.req.query) request.query = ctx.req.query;
    else if (ctx.request && ctx.request.query) request.query = ctx.request.query;

    if (ctx.body) request.body = ctx.body;
    else if (ctx.req && ctx.req.body) request.body = ctx.req.body;
    else if (ctx.request && ctx.request.body) request.body = ctx.request.body;

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

const compose = require('./compose');
const validateSchema = require('./validate-schema');
const defaultErrorCallback = require('./default-error-callback');

function createValidate(schema, errorCallback = defaultErrorCallback) {
  return async function validate(ctx, next) {
    try {
      const validators = [];

      if (schema.headers) {
        if (ctx.request.headers) validators.push(validateSchema(ctx.request.headers, schema.headers));
        else if (ctx.req.headers) validators.push(validateSchema(ctx.req.headers, schema.headers));
      }

      if (schema.params && ctx.params) validators.push(validateSchema(ctx.params, schema.params));

      if (schema.query) {
        if (ctx.request.query) validators.push(validateSchema(ctx.request.query, schema.query));
        else if (ctx.req.query) validators.push(validateSchema(ctx.req.query, schema.query));
      }

      if (schema.body) {
        if (ctx.request.body) validators.push(validateSchema(ctx.request.body, schema.body));
        else if (ctx.req.body) validators.push(validateSchema(ctx.req.body, schema.body));
      }

      if (schema.files && ctx.req.files) validators.push(validateSchema(ctx.req.files, schema.files));

      const validateSchemas = compose(...validators);
      validateSchemas();

      await next();
    } catch (e) {
      await errorCallback(ctx, e);
    }
  };
}

module.exports = createValidate;

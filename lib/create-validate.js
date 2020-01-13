const compose = require('./compose');
const validateScheme = require('./validate-scheme');

function createValidate(scheme, errorCallback) {
  return async function validate(ctx, next) {
    try {
      const validators = [];

      if (ctx.request.body) validators.push(validateScheme(ctx.request.body, scheme.body));
      else if (ctx.req.body) validators.push(validateScheme(ctx.req.body, scheme.body));

      if (ctx.params) validators.push(validateScheme(ctx.params, scheme.params));

      if (ctx.request.query) validators.push(validateScheme(ctx.request.query, scheme.query));
      else if (ctx.req.query) validators.push(validateScheme(ctx.req.query, scheme.query));

      if (ctx.req.files) validators.push(validateScheme(ctx.req.files, scheme.files));

      const validateSchemes = compose(...validators);
      validateSchemes();

      await next();
    } catch (e) {
      if (errorCallback) await errorCallback(ctx, e);
      else throw e;
    }
  };
}

module.exports = createValidate;

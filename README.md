# Koa Joi Validate Middleware

**Validate middleware generator using *Joi***

Easily create [Koa](https://github.com/koajs/koa) middleware for validate with [Joi](https://github.com/hapijs/joi).

​    

## Install

```shell
$ npm i koa-joi-validate-middleware
```

​    

## Usage

### Import

```js
const validateMiddleware = require('koa-joi-validate-middleware');
```

​    

### Create Validate Middleware

```js
const schema = {
  // Request headers Joi validation object
  headers: Joi.obejct({
  }),

  // URL query string Joi validation object
  query: Joi.obejct({
  }),

  // URL path parameters Joi validation object
  params: Joi.obejct({
    id: Joi.string().required(),
  }).required(),

  // POST body Joi validation object
  body: Joi.obejct({
  }),

  // Multipart files Joi validation object
  files: Joi.obejct({
  })
};

const validator = validateMiddleware.create(schema, errorCallback);
```

#### errorCallback

```js
function errorCallback(ctx, error) {
}
```

​    

### Use Validate Middleware

```js
router.get('/user', validator, async (ctx) => {
  const { id } = ctx.params;
  const response = await getUserInfo(id);
  ctx.body = response;
});

```


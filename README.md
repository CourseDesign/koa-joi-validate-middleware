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

### Set Joi

```js
const joi = require('joi');

validateMiddleware.joi.set(joi);
```

​    

### Create Validate Middleware

```js
const schema = {
  headers: {
    // Request headers Joi validation object
  },
  query: {
    // URL query string Joi validation object
  },
  params: {
    // URL path parameters Joi validation object
    id: joi.string().required(),
  },
  body: {
    // POST body Joi validation object
  },
  files: {
    // multipart files Joi validation object
  }
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


// index.js
const Koa = require('koa'); // temp, only for legacy javascript

const app = new Koa(); // initialising the Koa-object, i.e. the webserver

const port = 9000;  // easier to change using this const

// middleware functions: get executed in every request
app.use(async (ctx, next) => {
  console.log('logging the context, just after the start of the first middleware');
  console.log(ctx);
  console.log('just before the await next in the first middleware');
  await next();
  console.log('just behind the await next in the first middleware');
});

app.use(async (ctx, next) => {
  console.log('logging the context, just after the start of the second middleware');
  console.log(ctx);
  console.log('changing the body of the ctx');
  ctx.body = 'Hello World';
  console.log('logging the context, just after changing it');
  console.log(ctx);
  console.log('just before the await next in the second middleware');
  await next();
  console.log('just behind the await next in the second middleware');
});

app.use(async (ctx, next) => {
  console.log('logging the context, just after the start of the third middleware');
  console.log(ctx);
  console.log('just before the await next in the third middleware');
  return next();
  console.log('just behind the return next in the third middleware which is never executed');
});

app.listen(port);

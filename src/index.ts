// index.ts
import Koa from 'koa';

const app = new Koa(); // initialising the Koa-object, i.e. the webserver

const port = 9000;  // easier to change using this const

// middleware functions: get executed in every request
app.use(async (ctx) => {
  ctx.body = 'Hello World, now from TypeScript. Added this string to test the watch function';
});

app.listen(port);

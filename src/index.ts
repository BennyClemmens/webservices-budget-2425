// src/index.ts
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { getLogger } from './core/logging'; // import the getLogger function as a named (<=> default) import

const app = new Koa(); // initialising the Koa-object, i.e. the webserver

const port = 9000;  // easier to change using this const, perhaps later in config?


app.use(bodyParser());

// middleware functions: get executed in every request
app.use(async (ctx) => {
  ctx.body = 'Hello World, now from TypeScript. Added this string to test the watch function';
  getLogger().info(JSON.stringify(ctx.request));
});

app.listen(port, () => {
  getLogger().info(`🚀 Server listening on http://127.0.0.1:${port}`);
  getLogger().log(getLogger().level,`🚀 Server listening on http://127.0.0.1:${port}`); // use of config for logging
});

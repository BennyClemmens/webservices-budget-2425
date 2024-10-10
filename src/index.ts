// src/index.ts
import Koa from 'koa';
import { getLogger } from './core/logging'; // import the getLogger function as a named (<=> default) import

const app = new Koa(); // initialising the Koa-object, i.e. the webserver

const port = 9000;  // easier to change using this const, perhaps later in config?

// middleware functions: get executed in every request
app.use(async (ctx) => {
  ctx.body = 'Hello World, now from TypeScript. Added this string to test the watch function';
});

app.listen(port, () => {
  getLogger().info(`🚀 Server listening on http://127.0.0.1:${port}`);
});

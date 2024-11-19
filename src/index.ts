// src/index.ts
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'; // Router is functie, een constructor  
import { getLogger } from './core/logging'; // import the getLogger function as a named (<=> default) import

const app = new Koa(); // initialising the Koa-object, i.e. the webserver

const port = 9000;  // easier to change using this const, perhaps later in config?

app.use(bodyParser());

const router = new Router();

router.get('/api/transactions', (ctx) => {
  ctx.body = '[{"user": "Benjamin", "amount": 100, "place": "Irish Pub", "date": "2021-08-15" }]';
});

app.use(router.routes())  //effectieve routing
  .use(router.allowedMethods());  //http 405 als de url wel gekend is maar de methode niet toegelaten
  // en gaat bij cors antwoorden wat bij options is toegelaten

app.listen(port, () => {
  getLogger().info(`🚀 Server listening on http://127.0.0.1:${port}`);
  getLogger().log(getLogger().level,`🚀 Server listening on http://127.0.0.1:${port}`); // use of config for logging
});

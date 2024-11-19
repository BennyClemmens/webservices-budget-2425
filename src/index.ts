// src/index.ts
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'; // Router is functie, een constructor  
import { getLogger } from './core/logging'; // import the getLogger function as a named (<=> default) import
import * as transactionService from './service/transaction.service';

const app = new Koa(); // initialising the Koa-object, i.e. the webserver

const port = 9000;  // easier to change using this const, perhaps later in config?

app.use(bodyParser());

const router = new Router();

router.get('/api/transactions', (ctx) => {
  ctx.body = {
    items: transactionService.getAll(), // evt: pagination
  };
});

router.post('/api/transactions', (ctx) => {
  // export const create = ({ amount, date, placeId, user }: any)
  const newTransaction = transactionService.create({
    ...ctx.request.body, // we gaan er van uit dat dit amount en date is, types: H4
    placeId: Number(ctx.request.body.placeId),  // later: invoervalidatie
    date: new Date(ctx.request.body.date),
  });
  ctx.body = newTransaction;
});

app.use(router.routes())  //effectieve routing
  .use(router.allowedMethods());  //http 405 als de url wel gekend is maar de methode niet toegelaten

app.listen(port, () => {
  //getLogger().info(`🚀 Server listening on http://127.0.0.1:${port}`);
  getLogger().log(getLogger().level,`🚀 Server listening on http://127.0.0.1:${port}`); // use of config for logging
});

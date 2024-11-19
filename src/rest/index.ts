import type Application from 'koa';
import Router from '@koa/router';
import installTransactionRouter from './transaction.rest'; // naam aan de default geven

export default (app: Application) => {
  const router = new Router({
    prefix: '/api',
  });

  installTransactionRouter(router);

  app.use(router.routes())
    .use(router.allowedMethods());
};
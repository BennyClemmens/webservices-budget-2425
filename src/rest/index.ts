import type Application from 'koa';
import Router from '@koa/router';
import installTransactionRouter from './transaction.rest'; // naam aan de default geven
import installPlaceRouter from './place.rest';
import installUserRouter from './user.rest';
import installHealthRouter from './health.rest';
export default (app: Application) => {
  const router = new Router({
    prefix: '/api',
  });

  installTransactionRouter(router);
  installPlaceRouter(router);
  installUserRouter(router);
  installHealthRouter(router);

  app.use(router.routes())
    .use(router.allowedMethods());
};

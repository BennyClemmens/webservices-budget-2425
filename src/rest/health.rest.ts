import Router from '@koa/router';
import * as healtService from '../service/health.service';
import type { Context } from 'koa';

const ping = async (ctx: Context) => {
  ctx.body = healtService.ping();
  ctx.status = 200;
};

const version = async (ctx: Context) => {
  ctx.body = healtService.getVersion();
  ctx.status = 200;
};

export default (parent: Router) => {
  const router = new Router({
    prefix: '/health',
  });
  
  router.get('/ping', ping);
  router.get('/version', version);
  
  parent.use(router.routes())
    .use(router.allowedMethods());
};

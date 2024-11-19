import Router from '@koa/router'; // Router is functie, een constructor 
import * as userService from '../service/user.service';
import type { Context } from 'koa';

const getAllUsers = async (ctx: Context) => {
  ctx.body = {
    items: userService.getAll(), // evt: pagination
  };
};

const createUser = async (ctx: Context) => {
  const newUser = userService.create({
    name: String(ctx.request.body.name),
  });
  ctx.body = newUser;
};

const getUserById = async (ctx: Context) => {
  ctx.body = userService.getById(Number(ctx.params.id));
};

export default (parent: Router) => {
  const router = new Router({
    prefix: '/users',
  });

  router.get('/', getAllUsers);
  router.get('/:id', getUserById);
  router.post('/', createUser);
  
  parent.use(router.routes())
    .use(router.allowedMethods());
};

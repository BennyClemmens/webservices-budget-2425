import Router from '@koa/router'; // Router is functie, een constructor 
import * as userService from '../service/user.service';
import type { Context } from 'koa';

const getAllUsers = async (ctx: Context) => {
  ctx.body = {
    items: userService.getAll(), // evt: pagination
  };
};

const getUserById = async (ctx: Context) => {
  ctx.body = userService.getById(Number(ctx.params.id));
};

const createUser = async (ctx: Context) => {
  const newUser = userService.create({
    name: String(ctx.request.body.name),
  });
  ctx.body = newUser;
};

const updateUser = async (ctx: Context) => {
  const updatedUser = userService.updateById(Number(ctx.params.id), ctx.request.body!);
  ctx.body = updatedUser;
};

const deleteUser = async (ctx: Context) => {
  userService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};

export default (parent: Router) => {
  const router = new Router({
    prefix: '/users',
  });

  router.get('/', getAllUsers);
  router.get('/:id', getUserById);
  router.post('/', createUser);
  router.put('/:id', updateUser);
  router.delete('/:id', deleteUser);
  
  parent.use(router.routes())
    .use(router.allowedMethods());
};

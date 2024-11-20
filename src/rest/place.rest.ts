import Router from '@koa/router'; // Router is functie, een constructor 
import * as placeService from '../service/place.service';
import * as transactionService from '../service/transaction.service';
import type { Context } from 'koa';

const getAllPlaces = async (ctx: Context) => {
  ctx.body = {
    items: placeService.getAll(), // evt: pagination
  };
};

const getPlaceById = async (ctx: Context) => {
  ctx.body = placeService.getById(Number(ctx.params.id));
};

const getTransactionsByPlaceId = async (ctx: Context) => {
  const transactions = transactionService.getTransactionsByPlaceId(Number(ctx.params.id));
  ctx.body = {
    items: transactions,
  };
};

const createPlace = async (ctx: Context) => {
  // export const create = ({ amount, date, placeId, user }: any)
  const newPlace = placeService.create({
    name: String(ctx.request.body.name),
  });
  ctx.body = newPlace;
};

const updatePlace = async (ctx: Context) => {
  const place = placeService.updateById(Number(ctx.params.id), ctx.request.body!);
  ctx.body = place;
};
const deletePlace = async (ctx: Context) => {
  placeService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};

export default (parent: Router) => {
  const router = new Router({
    prefix: '/places',
  });

  router.get('/', getAllPlaces);
  router.get('/:id', getPlaceById);
  router.get('/:id/transactions', getTransactionsByPlaceId);
  router.post('/', createPlace);
  router.put('/:id', updatePlace);
  router.delete('/:id', deletePlace);
  
  parent.use(router.routes())
    .use(router.allowedMethods());
};

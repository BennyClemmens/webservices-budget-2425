import Router from '@koa/router'; // Router is functie, een constructor 
import * as transactionService from '../service/transaction.service';
import type { Context } from 'koa';

const getAllTransactions = async (ctx: Context) => {
  ctx.body = {
    items: transactionService.getAll(), // evt: pagination
  };
};

const createTransaction = async (ctx: Context) => {
  // export const create = ({ amount, date, placeId, user }: any)
  const newTransaction = transactionService.create({
    ...ctx.request.body, // we gaan er van uit dat dit amount en date is, types: H4
    placeId: Number(ctx.request.body.placeId),  // later: invoervalidatie
    date: new Date(ctx.request.body.date),
  });
  ctx.body = newTransaction;
};

const getTransactionById = async (ctx: Context) => { // id zit nu in ctx.params.id
  ctx.body = transactionService.getById(Number(ctx.params.id)); // verdwijnt later na invoervalidatie
};

const updateTransaction = async (ctx: Context) => {
  ctx.body = transactionService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
    placeId: Number(ctx.request.body.placeId),
    date: new Date(ctx.request.body.date),
  });
};

const deleteTransaction = async (ctx: Context) => {
  transactionService.deleteById(Number(ctx.params.id));
  ctx.status = 204; // why this?
};

export default (parent: Router) => { // waar deze zich moet onder hangen (/api)
  const router = new Router({
    prefix: '/transactions',
  });

  router.get('/', getAllTransactions);
  router.get('/:id', getTransactionById);
  router.post('/', createTransaction);
  router.put('/:id', updateTransaction);
  router.delete('/:id', deleteTransaction);
  
  // later : validation and authentication
  
  parent.use(router.routes())  // de router onder de parent hangen
    .use(router.allowedMethods());  //http 405 als de url wel gekend is maar de methode niet toegelaten
};


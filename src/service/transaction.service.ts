import { PLACES, USERS, TRANSACTIONS } from '../data/mock_data';
import { getLogger } from '../core/logging';

// CRUD operaties EN logica
// niet alles moet worden geexporteerd

export const getAll = () => {
  return TRANSACTIONS;
};

export const getById = (id: number) => {
  getLogger().log(getLogger().level,`${id}`);
  const existingTransaction = TRANSACTIONS.find((transaction) => transaction.id === id);
  if (!existingTransaction) {
    throw new Error(`no transaction with id ${id} found`); // now http 500, later 
  }
  return existingTransaction; // zonder voorgaande chack zou dit een 204  http zijn wegens undefined, 404 zou beter zijn
};

export const create = ({ amount, date, placeId, userId }: any) => {
  getLogger().log(getLogger().level,`${amount}, ${date}, ${placeId}, ${userId}`);
  //throw new Error('Not implemented yet!');
  const existingPlace = PLACES.find((place) => place.id === placeId);
  if (!existingPlace) {
    throw new Error(`no place with id ${placeId} found`); // now http 500, later 
  }
  const existingUser = USERS.find((user) => user.id === userId);
  if (!existingUser) {
    throw new Error(`no user with id ${userId} found`); // now http 500, later 
  }
  const maxId = Math.max(...TRANSACTIONS.map((transactions) => transactions.id));
  const newTransaction = {
    id: maxId +1,
    amount,
    date: date.toISOString(),
    place: existingPlace,
    user: existingUser,
  };
  TRANSACTIONS.push(newTransaction);
  return newTransaction; // of enkel id?
};

// id: 1,
// amount: -2000,
// date: '2021-05-08T00:00:00.000Z',
// user: {
//   id: 1,
//   name: 'Thomas Aelbrecht',
// },
// place: {
//   id: 2,
//   name: 'Irish Pub',
// },

export const updateById = (id: number,{ amount, date, placeId, user }: any) => {
  getLogger().log(getLogger().level,`${id}, ${amount}, ${date}, ${placeId}, ${user}`);
  throw new Error('Not implemented yet!');
};

export const deleteById = (id: number) => {
  getLogger().log(getLogger().level,`${id}`);
  throw new Error('Not implemented yet!');
};

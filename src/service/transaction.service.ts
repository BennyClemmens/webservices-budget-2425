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

export const updateById = (id: number,{ amount, date, placeId, userId }: any) => {
  getLogger().log(getLogger().level,`${id}, ${amount}, ${date}, ${placeId}, ${userId}`);
  // throw new Error('Not implemented yet!');
  const index = TRANSACTIONS.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`no transaction with id ${id} found`); // now http 500, later 
  }
  //const existingTransaction = getById(id);
  const existingPlace = PLACES.find((place) => place.id === placeId);
  if (!existingPlace) {
    throw new Error(`no place with id ${placeId} found`);
  }
  const existingUser = USERS.find((user) => user.id === userId);
  if (!existingUser) {
    throw new Error(`no user with id ${userId} found`); // now http 500, later 
  }
  const updatedTransaction = {
    //...TRANSACTIONS[index],
    id,
    amount,
    date: date.toISOString(),
    place: existingPlace,
    user: existingUser,
    // user: { id: existingUser.id, name: existingUser.name },
  };
  TRANSACTIONS[index] = updatedTransaction;
  return updatedTransaction;
};

export const deleteById = (id: number) => {
  getLogger().log(getLogger().level,`${id}`);
  const index = TRANSACTIONS.findIndex((t) => t.id === id);
  if (index === -1) {
    throw new Error(`no transaction with id ${id} found`); // now http 500, later 
  }
  TRANSACTIONS.splice(index, 1);
};

export const getTransactionsByPlaceId = (placeId: number) => {
  return TRANSACTIONS.filter((transaction) => transaction.place.id === placeId);
  // no check for non existing place, for databank later
};

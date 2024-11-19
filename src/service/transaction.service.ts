import { TRANSACTIONS } from '../data/mock_data';
import { getLogger } from '../core/logging';

// CRUD operaties EN logica
// niet alles moet worden geexporteerd

export const getAll = () => {
  return TRANSACTIONS;
};

export const getById = (id: number) => {
  getLogger().log(getLogger().level,`${id}`);
  throw new Error('Not implemented yet!');
};

export const create = ({ amount, date, placeId, user }: any) => {
  getLogger().log(getLogger().level,`${amount}, ${date}, ${placeId}, ${user}`);
  throw new Error('Not implemented yet!');
};

export const updateById = (id: number,{ amount, date, placeId, user }: any) => {
  getLogger().log(getLogger().level,`${id}, ${amount}, ${date}, ${placeId}, ${user}`);
  throw new Error('Not implemented yet!');
};

export const deleteById = (id: number) => {
  getLogger().log(getLogger().level,`${id}`);
  throw new Error('Not implemented yet!');
};

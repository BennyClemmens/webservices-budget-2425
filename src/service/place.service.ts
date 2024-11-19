import { PLACES } from '../data/mock_data';
import { getLogger } from '../core/logging';

// CRUD operaties EN logica
// niet alles moet worden geexporteerd

export const getAll = () => {
  return PLACES;
};

export const getById = (id: number) => {
  getLogger().log(getLogger().level,`${id}`);
  throw new Error('Not implemented yet!');
};

export const create = ({ name }: any) => {
  getLogger().log(getLogger().level,`${name}`);
  throw new Error('Not implemented yet!');
};

export const updateById = (id: number,{ name }: any) => {
  getLogger().log(getLogger().level,`${id}, ${name}`);
  throw new Error('Not implemented yet!');
};

export const deleteById = (id: number) => {
  getLogger().log(getLogger().level,`${id}`);
  throw new Error('Not implemented yet!');
};

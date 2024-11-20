import { USERS } from '../data/mock_data';
import { getLogger } from '../core/logging';

// CRUD operaties EN logica
// niet alles moet worden geexporteerd

export const getAll = () => {
  return USERS;
};

export const getById = (id: number) => {
  getLogger().log(getLogger().level,`${id}`);
  // throw new Error('Not implemented yet!');
  return USERS.find((user) => user.id === id);
};

export const create = ({ name }: any) => {
  getLogger().log(getLogger().level,`${name}`);
  // throw new Error('Not implemented yet!');
  const maxId = Math.max(...USERS.map((i) => i.id));
  const newUser = {
    id: maxId + 1,
    name,
  };
  USERS.push(newUser);
  return newUser;
};

export const updateById = (id: number,{ name }: any) => {
  getLogger().log(getLogger().level,`${id}, ${name}`);
  // throw new Error('Not implemented yet!');
  const index = USERS.findIndex((user) => user.id === id);
  const updatedUser = {
    ...USERS[index]!, // letting know id is present
    name,
  };
  USERS[index] = updatedUser;
  return updatedUser;
};

export const deleteById = (id: number) => {
  getLogger().log(getLogger().level,`${id}`);
  // throw new Error('Not implemented yet!');
  const index = USERS.findIndex((user) => user.id === id);
  USERS.splice(index, 1);
};

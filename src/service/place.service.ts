import { PLACES } from '../data/mock_data';
import { getLogger } from '../core/logging';

// CRUD operaties EN logica
// niet alles moet worden geexporteerd

export const getAll = () => {
  return PLACES;
};

export const getById = (id: number) => {
  getLogger().log(getLogger().level,`${id}`);
  //throw new Error('Not implemented yet!');
  return PLACES.find((place) => place.id === id);
};

export const create = ({ name, rating }: any) => {
  getLogger().log(getLogger().level,`${name}`);
  //throw new Error('Not implemented yet!');
  const maxId = Math.max(...PLACES.map((i) => i.id));
  const newPlace = {
    id: maxId + 1,
    name,
    rating,
  };
  PLACES.push(newPlace);
  return newPlace;
};

export const updateById = (id: number,{ name, rating }: any) => {
  getLogger().log(getLogger().level,`${id}, ${name}, ${rating}`);
  //throw new Error('Not implemented yet!');
  const index = PLACES.findIndex((place) => place.id === id);
  const updatedPlace = {
    ...PLACES[index]!, // letting know id is present
    name,
    rating,
  };
  PLACES[index] = updatedPlace;
  return updatedPlace;
};

export const deleteById = (id: number) => {
  getLogger().log(getLogger().level,`${id}`);
  //throw new Error('Not implemented yet!');
  const index = PLACES.findIndex((place) => place.id === id);
  PLACES.splice(index, 1);
};

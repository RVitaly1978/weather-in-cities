import { ADD_CITY } from '../actions/main';

export const addCity = (city) => ({
  type: ADD_CITY,
  payload: { city },
});

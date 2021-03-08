import { ADD_CITY } from '../actions/main';

export const initialMainState = {
  cities: [],
};

export const mainReducer = (state = initialMainState, action) => {
  switch (action.type) {
    case ADD_CITY:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

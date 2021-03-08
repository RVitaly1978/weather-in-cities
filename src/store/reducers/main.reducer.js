import {
  SET_SEARCH_VALUE, SET_SEARCH_RESULTS,
  ADD_TRACK_CITY,
} from '../actions/main';

export const initialMainState = {
  searchValue: '',
  searchResults: [],
  cities: [],
};

const addTrackCity = ({ searchResults, cities }, id) => {
  const city = searchResults.find((city) => city.id === id);
  return [...cities, city];
};

export const mainReducer = (state = initialMainState, action) => {
  switch (action.type) {
    case SET_SEARCH_VALUE:
    case SET_SEARCH_RESULTS:
      return { ...state, ...action.payload };

    case ADD_TRACK_CITY:
      return { ...state, cities: addTrackCity(state, action.payload.id) };

    default:
      return state;
  }
};

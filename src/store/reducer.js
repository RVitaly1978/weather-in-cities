import {
  GEOCODING_FETCHING, GEOCODING_FETCHING_ERROR,
  SET_SEARCH_VALUE, SET_SEARCH_RESULTS,
  SET_CITY_TO_TRACKED_LIST, WEATHER_FETCHING, WEATHER_FETCHING_ERROR,
} from './actions';

export const initialState = {
  isGeocodingFetching: false,
  geocodingFetchingError: null,
  searchValue: '',
  searchResults: [],
  cities: [],
  weather: [],
};

const addCityToTrackedList = ({ searchResults, cities }, id) => {
  const city = searchResults.find((city) => city.id === id);
  return [...cities, city];
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GEOCODING_FETCHING:
    case GEOCODING_FETCHING_ERROR:
    case SET_SEARCH_VALUE:
    case SET_SEARCH_RESULTS:
      return { ...state, ...action.payload };

    case SET_CITY_TO_TRACKED_LIST:
      return { ...state, cities: addCityToTrackedList(state, action.payload.id) };

    default:
      return state;
  }
};

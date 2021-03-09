import {
  GEOCODING_FETCHING, GEOCODING_FETCHING_ERROR,
  SET_SEARCH_VALUE, SET_SEARCH_RESULTS,
  SET_CITY_TO_TRACKED_LIST, UPDATE_CITY_WEATHER,
  // WEATHER_FETCHING, WEATHER_FETCHING_ERROR,
} from './actions';

export const initialState = {
  isGeocodingFetching: false,
  geocodingFetchingError: null,
  searchValue: '',
  searchResults: [],
  cities: [],
};

const addCityToTrackedList = ({ searchResults, cities }, id) => {
  const city = searchResults.find((city) => city.id === id);
  city.weather = { isWeatherFetching: true, weatherFetchingError: null };
  return [...cities, city];
};

const updateCityInList = (cities, city) => {
  const index = cities.findIndex(({ id }) => id === city.id);
  return [
    ...cities.slice(0, index),
    city,
    ...cities.slice(index + 1),
  ];
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

    case UPDATE_CITY_WEATHER:
      return { ...state, cities: updateCityInList(state.cities, action.payload.city) };

    default:
      return state;
  }
};

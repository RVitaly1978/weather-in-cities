import { geocoding } from '../api/geocoding/geocoding-api';
import { getWeather } from '../api/weather/weather-api';
import {
  GEOCODING_FETCHING, GEOCODING_FETCHING_ERROR,
  SET_SEARCH_VALUE, SET_SEARCH_RESULTS,
  SET_CITY_TO_TRACKED_LIST, UPDATE_CITY_WEATHER,
  // WEATHER_FETCHING, WEATHER_FETCHING_ERROR,
} from './actions';

// action creators ---------------------------

export const setGeocodingFetching = (isGeocodingFetching) => ({
  type: GEOCODING_FETCHING,
  payload: { isGeocodingFetching },
});

export const setGeocodingFetchingError = (geocodingFetchingError) => ({
  type: GEOCODING_FETCHING_ERROR,
  payload: { geocodingFetchingError },
});


export const setSearchValue = (searchValue) => ({
  type: SET_SEARCH_VALUE,
  payload: { searchValue },
});

export const setSearchResults = (searchResults) => ({
  type: SET_SEARCH_RESULTS,
  payload: { searchResults },
});

export const setCityToTrackedList = (id) => ({
  type: SET_CITY_TO_TRACKED_LIST,
  payload: { id },
});

export const updateCityWeather = (city) => ({
  type: UPDATE_CITY_WEATHER,
  payload: { city },
});

// export const setWeatherFetching = (id, isWeatherFetching) => ({
//   type: WEATHER_FETCHING,
//   payload: { id, isWeatherFetching },
// });

// export const setWeatherFetchingError = (id, weatherFetchingError) => ({
//   type: WEATHER_FETCHING_ERROR,
//   payload: { id, weatherFetchingError },
// });

// thunk creators --------------------------------

export const citiesSearch = (search) => {
  return async (dispatch) => {
    dispatch(setSearchValue(search));
    dispatch(setGeocodingFetching(true));

    try {
      const cities = await geocoding(search);
      dispatch(setSearchResults(cities));
    } catch (e) {
      dispatch(setSearchResults([]));
      dispatch(setGeocodingFetchingError(e.message));
    } finally {
      dispatch(setGeocodingFetching(false));
    }
  }
};

export const addCity = (id) => {
  return async (dispatch, getState) => {
    dispatch(setCityToTrackedList(id));
    const { cities } = getState();
    const city = cities.find((city) => city.id === id );

    try {
      const weather = await getWeather(city.center);
      const updated = {
        ...city,
        weather: {
          ...weather,
          isWeatherFetching: false,
          weatherFetchingError: null,
        },
      };
      dispatch(updateCityWeather(updated));
    } catch (e) {
      const updated = {
        ...city,
        weather: {
          ...city.weather,
          isWeatherFetching: false,
          weatherFetchingError: e.message,
        },
      };
      dispatch(updateCityWeather(updated));
    }
  }
};

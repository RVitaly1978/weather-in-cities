import { geocoding } from '../api/geocoding/geocoding-api';
import {
  GEOCODING_FETCHING, GEOCODING_FETCHING_ERROR,
  SET_SEARCH_VALUE, SET_SEARCH_RESULTS,
  SET_CITY_TO_TRACKED_LIST, WEATHER_FETCHING, WEATHER_FETCHING_ERROR,
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

// export const setWeatherFetching = (isWeatherFetching) => ({
//   type: WEATHER_FETCHING,
//   payload: { isWeatherFetching },
// });

// export const setWeatherFetchingError = (weatherFetchingError) => ({
//   type: WEATHER_FETCHING_ERROR,
//   payload: { weatherFetchingError },
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

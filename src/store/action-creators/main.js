import { geocoding } from '../../api/geocoding/geocoding-api';
import {
  SET_SEARCH_VALUE, SET_SEARCH_RESULTS,
  ADD_TRACK_CITY,
} from '../actions/main';
import { setGeocodingFetching, setGeocodingFetchingError } from './common';

export const setSearchValue = (searchValue) => ({
  type: SET_SEARCH_VALUE,
  payload: { searchValue },
});

export const setSearchResults = (searchResults) => ({
  type: SET_SEARCH_RESULTS,
  payload: { searchResults },
});

export const addTrackCity = (id) => ({
  type: ADD_TRACK_CITY,
  payload: { id },
});

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

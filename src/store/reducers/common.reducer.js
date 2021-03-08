import {
  GEOCODING_FETCHING, GEOCODING_FETCHING_ERROR,
  WEATHER_FETCHING, WEATHER_FETCHING_ERROR,
} from "../actions/common";

export const initState = {
  isGeocodingFetching: false,
  geocodingFetchingError: null,
  isWeatherFetching: false,
  weatherFetchingError: null,
};

export const commonReducer = (state = initState, action) => {
  switch (action.type) {
    case GEOCODING_FETCHING:
    case GEOCODING_FETCHING_ERROR:
    case WEATHER_FETCHING:
    case WEATHER_FETCHING_ERROR:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

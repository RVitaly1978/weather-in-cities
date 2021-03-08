import {
  GEOCODING_FETCHING, GEOCODING_FETCHING_ERROR,
  WEATHER_FETCHING, WEATHER_FETCHING_ERROR,
} from '../actions/common';

export const setGeocodingFetching = (isGeocodingFetching) => ({
  type: GEOCODING_FETCHING,
  payload: { isGeocodingFetching },
});

export const setGeocodingFetchingError = (geocodingFetchingError) => ({
  type: GEOCODING_FETCHING_ERROR,
  payload: { geocodingFetchingError },
});

export const setWeatherFetching = (isWeatherFetching) => ({
  type: WEATHER_FETCHING,
  payload: { isWeatherFetching },
});

export const setWeatherFetchingError = (weatherFetchingError) => ({
  type: WEATHER_FETCHING_ERROR,
  payload: { weatherFetchingError },
});

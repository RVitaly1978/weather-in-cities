import { WEATHER_FETCHING } from '../actions/common';

export const setWeatherFetching = (isWeatherFetching) => ({
  type: WEATHER_FETCHING,
  payload: { isWeatherFetching },
});

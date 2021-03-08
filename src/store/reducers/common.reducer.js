import { WEATHER_FETCHING } from "../actions/common";

export const initState = {
  isWeatherFetching: false,
  WeatherFetchingError: null,
};

export const commonReducer = (state = initState, action) => {
  switch (action.type) {
    case WEATHER_FETCHING:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

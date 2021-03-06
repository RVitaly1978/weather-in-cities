import axios from 'axios';

import { getWeatherResult } from './get-weather-result';

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const KEY = process.env.REACT_APP_WEATHER_API_KEY;

export const getWeather = async ([longitude, latitude]) => {
  const params = {
    lat: latitude,
    lon: longitude,
    units: 'metric',
    appid: KEY,
  };

  try {
    const res = await axios.get(URL, { params });

    if (res.data) {
      return getWeatherResult(res.data);
    }

    return {};

  } catch (e) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else if (e.request) {
      throw new Error(e.message);
    } else {
      throw new Error(`Error: ${e.message}.`);
    }
  }
};

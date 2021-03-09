import axios from 'axios';

import { getSearchResult } from './get-search-result';

const URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const KEY = process.env.REACT_APP_GEOCODING_API_KEY;
const LIMIT = 10;

export const geocoding = async (city) => {
  const search_text = city.split(' ').join('%20');
  const params = {
    autocomplete: true,
    types: 'place',
    limit: LIMIT,
    access_token: KEY,
  };

  try {
    const res = await axios.get(`${URL}${search_text}.json`, { params });

    if (res.data && res.data.features) {
      return res.data.features.map(getSearchResult);
    }

    throw new Error('Error: bad request');

  } catch (e) {
    throw new Error(`Something is wrong with server: ${e.message}.`);
  }
};

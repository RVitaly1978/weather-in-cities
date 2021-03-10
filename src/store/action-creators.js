import { geocoding } from '../api/geocoding/geocoding-api';
import { getWeather } from '../api/weather/weather-api';
import {
  GEOCODING_FETCHING, GEOCODING_FETCHING_ERROR,
  SET_SEARCH_VALUE, SET_SEARCH_RESULTS,
  SET_CITY_TO_TRACKED_LIST, UPDATE_CITY_WEATHER,
  DELETE_CITY_FROM_LIST, SET_INITIAL_LOADING,
  SET_ALL_CITIES_WEATHER, SET_CANCEL_UPDATE,
  SET_UPDATE_DELAY,
} from './actions';

const updateCityData = (city, isLoading, error, weather) => {
  if (weather) {
    return {
      ...city,
      weather: {
        ...weather,
        isWeatherFetching: isLoading,
        weatherFetchingError: error,
      },
    };
  }

  return {
    ...city,
    weather: {
      ...city.weather,
      isWeatherFetching: isLoading,
      weatherFetchingError: error,
    },
  };
};

const saveToStorage = (getState) => {
  const { cities } = getState();
  const data = JSON.stringify(cities);
  localStorage.setItem('weather-in-cities', data);
};

const loadFromStorage = () => {
  const saved = localStorage.getItem('weather-in-cities');
  if (saved) {
    return JSON.parse(saved);
  }

  return [];
};

// action creators ---------------------------

export const setInitialLoading = (initialLoading) => ({
  type: SET_INITIAL_LOADING,
  payload: { initialLoading },
});

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

export const deleteCityFromList = (id) => ({
  type: DELETE_CITY_FROM_LIST,
  payload: { id },
});

export const updateCityWeather = (city) => ({
  type: UPDATE_CITY_WEATHER,
  payload: { city },
});

export const setAllCitiesWeather = (cities) => ({
  type: SET_ALL_CITIES_WEATHER,
  payload: { cities },
});

export const setCancelUpdate = (cancelUpdate) => ({
  type: SET_CANCEL_UPDATE,
  payload: { cancelUpdate },
});

export const setUpdateDelay = (updateDelay) => ({
  type: SET_UPDATE_DELAY,
  payload: { updateDelay },
});

// thunk creators --------------------------------

export const init = () => {
  return (dispatch) => {
    const cities = loadFromStorage();
    dispatch(setAllCitiesWeather(cities));
    dispatch(setInitialLoading(false));
  }
};

export const citiesSearch = (search) => {
  return async (dispatch, getState) => {
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
      saveToStorage(getState);
    }
  }
};

export const addCity = (id) => {
  return async (dispatch, getState) => {
    const candidate = getState().cities.find((city) => city.id === id );
    if (!candidate) {
      dispatch(setCityToTrackedList(id));
      const city = getState().cities.find((city) => city.id === id );

      try {
        const weather = await getWeather(city.center);
        const updated = updateCityData(city, false, null, weather);
        dispatch(updateCityWeather(updated));
      } catch (e) {
        const updated = updateCityData(city, false, e.message);
        dispatch(updateCityWeather(updated));
      } finally {
        saveToStorage(getState);
      }
    }
  }
};

export const updateCity = (id) => {
  return async (dispatch, getState) => {
    const city = getState().cities.find((city) => city.id === id );

    let updated = updateCityData(city, true, null);
    dispatch(updateCityWeather(updated));

    try {
      const weather = await getWeather(city.center);
      updated = updateCityData(city, false, null, weather);
      dispatch(updateCityWeather(updated));
    } catch (e) {
      const updated = updateCityData(city, false, e.message);
      dispatch(updateCityWeather(updated));
    } finally {
      saveToStorage(getState);
    }
  }
};

export const updateAllCities = () => {
  return async (dispatch, getState) => {
    const { cities } = getState();

    if (cities.length) {
      let updated = cities.map((city) => updateCityData(city, true, null));
      dispatch(setAllCitiesWeather(updated));

      cities.map(async (city) => {
        try {
          const weather = await getWeather(city.center);
          updated = updateCityData(city, false, null, weather);
          !getState().cancelUpdate && dispatch(updateCityWeather(updated));
        } catch (e) {
          const updated = updateCityData(city, false, e.message);
          !getState().cancelUpdate && dispatch(updateCityWeather(updated));
        } finally {
          !getState().cancelUpdate && saveToStorage(getState);
        }
      });
    }
  }
};

export const deleteCity = (id) => {
  return (dispatch, getState) => {
    dispatch(deleteCityFromList(id));
    saveToStorage(getState);
  }
};

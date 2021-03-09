import React from 'react';
import { useSelector } from 'react-redux';

import { CityCard } from '../city-card/city-card';

// import {
//   setGeocodingFetchingError, setSearchResults, citiesSearch, addCity,
// } from '../../store/action-creators';

export const CitiesList = () => {
  // const dispatch = useDispatch();
  const cities = useSelector(s => s.cities);
  // const isLoading = useSelector(s => s.isGeocodingFetching);
  // const error = useSelector(s => s.geocodingFetchingError);

  // const handleInputChange = (value) => {
  //   error && dispatch(setGeocodingFetchingError(null));

  //   const search = value.trim();
  //   if (search && search.length >= 3) {
  //     dispatch(citiesSearch(search));
  //   }
  // }

  // const handleChange = (select) => {
  //   if (select) {
  //     dispatch(addCity(select.value));
  //     dispatch(setSearchResults([]));
  //   }
  // }

  const list = cities.map(({ id, text, weather }) => {
    return <CityCard key={id} city={text} weather={weather} />;
  });

  return (
    <div>
      {list}
    </div>
  );
};

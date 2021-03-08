import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';

import { setGeocodingFetchingError } from '../../store/action-creators/common';
import {
  addTrackCity, citiesSearch, setSearchResults,
} from '../../store/action-creators/main';

export const SearchInput = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector(s => s.main.searchResults);
  const isLoading = useSelector(s => s.common.isGeocodingFetching);
  const error = useSelector(s => s.common.geocodingFetchingError);

  const handleInputChange = (value) => {
    error && dispatch(setGeocodingFetchingError(null));

    const search = value.trim();
    if (search && search.length >= 3) {
      dispatch(citiesSearch(search));
    }
  }

  const handleChange = (select) => {
    if (select) {
      dispatch(addTrackCity(select.value));
      dispatch(setSearchResults([]));
    }
  }

  const options = searchResults
    .map(({ id, place }) => ({ value: id, label: place }));

  return (
    <div>
      <Select
        isClearable={true}
        isLoading={isLoading}
        options={options}
        placeholder='Select city...'
        onChange={handleChange}
        onInputChange={handleInputChange} />
    </div>
  );
};

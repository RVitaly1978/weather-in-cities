import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import debounce from 'debounce';

import {
  setGeocodingFetchingError, setSearchResults, citiesSearch, addCity,
} from '../../store/action-creators';
import { ErrorMessage } from '../error-message/error-message';

import './select-input.scss';

export const SearchInput = () => {
  const dispatch = useDispatch();
  const searchResults = useSelector(s => s.searchResults);
  const isLoading = useSelector(s => s.isGeocodingFetching);
  const error = useSelector(s => s.geocodingFetchingError);

  const handleInputChange = (value) => {
    error && dispatch(setGeocodingFetchingError(null));

    const search = value.trim();
    if (search && search.length >= 3) {
      dispatch(citiesSearch(search));
    }
  }

  const handleChange = (select) => {
    if (select) {
      dispatch(addCity(select.value));
      dispatch(setSearchResults([]));
    }
  }

  const options = searchResults
    .map(({ id, place }) => ({ value: id, label: place }));

  return (
    <div className='input_container'>
      <Select
        isClearable={true}
        isLoading={isLoading}
        options={options}
        placeholder='Select city...'
        onChange={handleChange}
        onInputChange={debounce(handleInputChange, 500)} />

      <ErrorMessage error={error} />
    </div>
  );
};

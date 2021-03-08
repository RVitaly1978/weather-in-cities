import React from 'react';
import { useSelector } from 'react-redux';

import { ErrorMessage } from '../error-message/error-message';
import { SearchInput } from '../search-input/search-input';

import './app.scss';

export const App = () => {
  const geocodingError = useSelector(s => s.common.geocodingFetchingError);
  const weatherError = useSelector(s => s.common.weatherFetchingError);

  return (
    <div>
      <SearchInput />

      <ErrorMessage
        error={geocodingError || weatherError}
        classes='error' />
    </div>
  );
};

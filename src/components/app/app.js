import React from 'react';

import { SearchInput } from '../search-input/search-input';
import { CitiesList } from '../cities-list/cities-list';

import './app.scss';

export const App = () => {
  return (
    <div className='app'>
      <div className='app_controls'>
        <SearchInput />
      </div>

      <CitiesList />

    </div>
  );
};

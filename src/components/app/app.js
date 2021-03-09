import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { init } from '../../store/action-creators';

import { SearchInput } from '../search-input/search-input';
import { CitiesList } from '../cities-list/cities-list';
import { BounceLoader } from '../bounce-loader/bounce-loader';

import './app.scss';

export const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(s => s.initialLoading);

  useEffect(() => {
    dispatch(init());
  });

  return (
    <div className='app'>
      <div className='app_controls'>
        <SearchInput />
      </div>

      {isLoading
        ? <BounceLoader classes='app_loader' />
        : <CitiesList />
      }
    </div>
  );
};

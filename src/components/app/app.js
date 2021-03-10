import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { init, updateAllCities, setCancelUpdate } from '../../store/action-creators';

import { SearchInput } from '../search-input/search-input';
import { CitiesList } from '../cities-list/cities-list';
import { MaxMinCitiesCard } from '../max-min-cities-card/max-min-cities-card';
import { BounceLoader } from '../bounce-loader/bounce-loader';
import { SelectDelay } from '../select-delay/select-delay';

import './app.scss';

export const App = () => {
  const dispatch = useDispatch();
  const { initialLoading, updateDelay } = useSelector(s => s);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCancelUpdate(false));

    async function update() {
      dispatch(updateAllCities());
      await new Promise(resolve => setTimeout(resolve, updateDelay));
      await update();
    }

    !initialLoading && update();

    return (() => !initialLoading && dispatch(setCancelUpdate(true)));
  }, [dispatch, initialLoading, updateDelay]);

  return (
    <div className='app'>
      <div className='app_controls'>
        <SearchInput />
        <SelectDelay />
      </div>

      {initialLoading
        ? <BounceLoader classes='app_loader' />
        : <>
            <CitiesList />
            <MaxMinCitiesCard />
          </>
      }
    </div>
  );
};

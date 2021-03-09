import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteCity, updateCity } from '../../store/action-creators';

import { CityCard } from '../city-card/city-card';

import './cities-list.scss';

export const CitiesList = () => {
  const dispatch = useDispatch();
  const cities = useSelector(s => s.cities);

  const handleDelete = (id) => {
    dispatch(deleteCity(id));
  };

  const handleUpdate = (id) => {
    dispatch(updateCity(id));
  };

  const list = cities.map(({ id, text, weather }) => {
    return <CityCard key={id}
      id={id}
      city={text}
      weather={weather}
      onDelete={handleDelete}
      onUpdate={handleUpdate} />;
  });

  return (
    <div className='cities_container'>
      {list}
    </div>
  );
};

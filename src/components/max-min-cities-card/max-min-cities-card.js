import React from 'react';
import { useSelector } from 'react-redux';

import './max-min-cities-card.scss';

const selectMaxMin = (state) => {
  const { cities } = state;

  if (!cities.length) {
    return null;
  }

  if (cities.length === 1) {
    return [cities[0]];
  }

  const sorted = [...cities].sort((a, b) => a.weather.temperature - b.weather.temperature);
  return [sorted[0], sorted[sorted.length - 1]];
}

export const MaxMinCitiesCard = () => {
  const cities = useSelector(selectMaxMin);

  if (!cities || cities.length === 1) {
    return null;
  }

  const [min, max] = cities;

  return (
    <div className='min_max_city_card'>
      <div className='card_content'>
        <p>{`${min.text}: ${min.weather.temperature} °C`}</p>
        <p>{`${max.text}: ${max.weather.temperature} °C`}</p>
      </div>
    </div>
  );
};

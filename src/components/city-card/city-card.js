import React from 'react';

import { ErrorMessage } from '../error-message/error-message';

import './city-card.scss';

export const CityCard = ({ city, weather }) => {
  if (weather.weatherFetchingError) {
    return (
      <div className='city_card'>
        <h2>{`Город: ${city}`}</h2>

        <ErrorMessage error={weather.weatherFetchingError} />
      </div>
    );
  }

  if (weather.isWeatherFetching) {
    return (
      <div>
        <h2>{`Город: ${city}`}</h2>
        <p>Loading...</p>
      </div>
    );
  }

  const { temperature, humidity, pressure, windSpeed } = weather;

  return (
    <div>
      <h2>{`Город: ${city}`}</h2>
      <p>{`Температура: ${temperature}`}</p>
      <p>{`Влажность: ${humidity}`}</p>
      <p>{`Давление: ${pressure}`}</p>
      <p>{`Ветер: ${windSpeed}`}</p>
    </div>
  );
};

// cityId: String(id),
// cityName: name,
// date: dt,
// timezone,
// windSpeed: wind.speed,
// windDeg: wind.deg,
// temperature: main.temp,
// humidity: main.humidity,
// pressure: main.pressure,
// feels: main.feels_like,

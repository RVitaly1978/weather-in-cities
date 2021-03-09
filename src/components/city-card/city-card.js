import React from 'react';

import { ErrorMessage } from '../error-message/error-message';

import './city-card.scss';

export const CityCard = ({ id, city, weather, onUpdate, onDelete }) => {
  const { isWeatherFetching, weatherFetchingError } = weather;

  return (
    <div className='city_card'>
      <div className='card_content'>
        <h2>{`Город: ${city}`}</h2>
        {weather.temperature && <p>{`Температура: ${weather.temperature}`}</p>}
        {weather.humidity && <p>{`Влажность: ${weather.humidity}`}</p>}
        {weather.pressure && <p>{`Давление: ${weather.pressure}`}</p>}
        {weather.windSpeed && <p>{`Ветер: ${weather.windSpeed}`}</p>}
        {weather.windDeg && <p>{`Ветер-направление: ${weather.windDeg}`}</p>}
        {weather.date && <p>{`Дата обновления: ${new Date(weather.date * 1000)}`}</p>}
      </div>

      <div className='card_buttons'>
        <button
          onClick={() => onUpdate(id)}
          disabled={isWeatherFetching} >
          {isWeatherFetching ? 'Обновление...' : 'Обновить'}
        </button>

        <button
          onClick={() => onDelete(id)}
          disabled={isWeatherFetching} >
          {'Удалить'}
        </button>
      </div>

      {weatherFetchingError && <ErrorMessage error={weather.weatherFetchingError} />}
    </div>
  );
};

// timezone,
// feels: main.feels_like,

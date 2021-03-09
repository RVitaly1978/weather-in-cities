import React from 'react';

import { ArrowIcon } from '../arrow-icon/arrow-icon';
import { ErrorMessage } from '../error-message/error-message';

import './city-card.scss';

export const CityCard = ({ id, city, weather, onUpdate, onDelete }) => {
  const { isWeatherFetching, weatherFetchingError } = weather;

  const styles = weather.windDeg
    ? { 'transform': `rotate(${weather.windDeg + 90}deg)`, 'color': 'blue' }
    : null;

  return (
    <div className='city_card'>
      <div className='card_content'>
        <h2>{`Город: ${city}`}</h2>
        {weather.temperature && <p>{`Температура: ${weather.temperature} °C`}</p>}
        {weather.humidity && <p>{`Влажность: ${weather.humidity} %`}</p>}
        {weather.pressure && <p>{`Атмосферное давление: ${weather.pressure * 100} Па`}</p>}
        {weather.windSpeed && <p>{`Скорость ветра: ${weather.windSpeed} м/с`}&nbsp;<ArrowIcon styles={styles} /></p>}
        {weather.date && <p>{`Дата обновления: ${new Date(weather.date * 1000).toLocaleString()}`}</p>}
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

import React from 'react';

import { ArrowIcon } from '../arrow-icon/arrow-icon';
import { ErrorMessage } from '../error-message/error-message';
import { BounceLoader } from '../bounce-loader/bounce-loader';

import './city-card.scss';

export const CityCard = ({ id, city, weather, onUpdate, onDelete }) => {
  const { isWeatherFetching, weatherFetchingError } = weather;

  const styles = weather.windDeg
    ? { 'transform': `rotate(${weather.windDeg + 90}deg)`, 'color': 'blue' }
    : null;

  return (
    <div className='city_card'>
      <div className='card_content'>
        <h2>
          <span>{`Город: ${city}`}</span>&nbsp;
          {isWeatherFetching && <BounceLoader classes='card_loader' />}
        </h2>

        {String(weather.temperature)
          && <p>{`Температура: ${weather.temperature} °C`}</p>}

        {String(weather.humidity)
          && <p>{`Влажность: ${weather.humidity} %`}</p>}

        {String(weather.pressure)
          && <p>{`Атмосферное давление: ${weather.pressure * 100} Па`}</p>}

        {String(weather.windSpeed)
          && <p>{`Скорость ветра: ${weather.windSpeed} м/с`}&nbsp;
                <ArrowIcon styles={styles} />
              </p>}

        {weather.date
          && <p>{`Дата обновления: ${new Date(weather.date * 1000).toLocaleString()}`}</p>}
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

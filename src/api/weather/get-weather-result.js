export const getWeatherResult = ({ id, dt, timezone, wind, main, name }) => {
  return {
    cityId: String(id),
    cityName: name,
    date: dt,
    timezone,
    windSpeed: wind.speed,
    windDeg: wind.deg,
    temperature: main.temp,
    humidity: main.humidity,
    pressure: main.pressure,
    feels: main.feels_like,
  };
};

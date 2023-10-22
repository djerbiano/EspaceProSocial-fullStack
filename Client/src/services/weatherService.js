export default async function getWeatherForCity(city) {
  let api_key = process.env.REACT_APP_API_METEO_KEY;

  return await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
  );
}

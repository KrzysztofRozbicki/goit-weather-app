const dataEl = document.getElementById('data');
const searchButtonEl = document.getElementById('search-city');
const searchInputEl = document.getElementById('search-city-input');
const errorMessageEl = document.getElementById('error-message');
const infoEl = document.getElementById('info');
const cityEl = document.getElementById('city');
const todayIconEl = document.getElementById('today-icon');
const todayTempEl = document.getElementById('today-temp');
const todayWindEl = document.getElementById('today-wind');
const todayWindDirectionEl = document.getElementById('today-wind-direction');
const windArrowEl = document.getElementById('wind-arrow');
const hourEl = document.getElementById('hour');
const forecastEl = document.getElementById('forecast');
const date = new Date();
let hour = date.getHours();
infoEl.style.display = 'none';
function getWeatherData(city) {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=5da41c0a3a994cb28d6162741232002&q=${city}&days=3&aqi=yes&alerts=yes`
  )
    .then(response => response.json())
    .then(data => {
      errorMessageEl.textContent = '';
      dataEl.textContent = '';
      if (data.error) {
        errorMessageEl.textContent = data.error.message;
        infoEl.style.display = 'none';
      } else {
        //dataEl.textContent = JSON.stringify(data, null, 6);
        infoEl.style.display = 'flex';
        cityEl.textContent = data.location.name;
        todayIconEl.innerHTML = `<img class="weather-icon" src="https:${data.current.condition.icon}" />`;
        todayTempEl.innerHTML = `${data.current.temp_c}&deg`;
        todayWindEl.innerHTML = `${data.current.wind_kph} km/h`;
        todayWindDirectionEl.textContent = data.current.wind_dir;
        windArrowEl.style.rotate = `${data.current.wind_degree}deg`;
        hourEl.textContent = data.current.last_updated.substring(11);
        for (const temp in data.forecast.forecastday[0].hour[hour]) {
          console.log(temp);
        }
        forecastEl.textContent = JSON.stringify(
          data.forecast.forecastday[0].hour[hour],
          null,
          6
        );
      }
    });
}

searchButtonEl.addEventListener('click', () => {
  const city = searchInputEl.value;
  getWeatherData(city);
});

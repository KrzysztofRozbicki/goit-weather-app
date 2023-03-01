const searchButtonEl = document.getElementById('search-city');
const searchInputEl = document.getElementById('search-city-input');
const errorMessageEl = document.getElementById('error-message');
const infoEl = document.getElementById('info');
const cityEl = document.getElementById('city');
const date = new Date();
let hour = date.getHours();
infoEl.style.display = 'none';

const showWeather = () => {
  const city = searchInputEl.value;
  getWeatherData(city);
};

searchButtonEl.addEventListener('click', () => showWeather());

searchInputEl.addEventListener('keypress', event => {
  if (event.key === 'Enter') {
    event.preventDefault();
    showWeather();
  }
});

function getWeatherData(city) {
  fetch(
    `http://api.weatherapi.com/v1/forecast.json?key=5da41c0a3a994cb28d6162741232002&q=${city}&days=3&aqi=yes&alerts=yes`
  )
    .then(response => response.json())
    .then(data => {
      errorMessageEl.textContent = '';
      if (data.error) {
        errorMessageEl.textContent = data.error.message;
        infoEl.style.display = 'none';
      } else {
        infoEl.style.display = 'flex';
        cityEl.textContent = data.location.name;
        console.log(data);
        //Utowrzenie 72 elementowej tablicy obiektów, każdy obiekt to jedna godzina prognozy pogody.
        const hoursForecast = data.forecast.forecastday.flatMap(
          item => item.hour
        );
        //wywołanie funkcji prognozy 3 dniowej
        infoEl.innerHTML =
          forecastThreeDays(hoursForecast) +
          `<div class="swiper-pagination"></div>`;
      }
    });
}

// Funkcja która przyjmuje jako parametr flatMapę prognozy godzinowej (tabele na kolejne 72 godziny) i tworzy z niej kolejne divy
const forecastThreeDays = data => {
  let weatherText = '';
  const hoursInterval = 3;

  for (let i = hour; i < data.length; i += hoursInterval) {
    weatherText += `<div
        class="flex swiper-slide  weather-box text-white text-xl flex flex-col py-6 px-6 items-center border-2 rounded-lg border-white">
        <div><img class="weather-icon" src="https:${
          data[i].condition.icon
        }" /></div>
        <p class="mb-8">${data[i].temp_c} &deg</p>
        <p class="mb-8">${data[i].wind_kph} km/h</p>
        <div class="flex">
          <div class="arrow" style="transform: rotate(${
            data[i].wind_degree + 180
          }deg)">
            <img src="https://raw.githubusercontent.com/KrzysztofRozbicki/goit-weather-app/main/src/images/arrow.png" />
          </div>
          <p>${data[i].wind_dir}</p>
        </div>
        <p class="mb-6">${data[i].time.substring(11)}</p>
        <p>${data[i].time.substring(0, 10)}</p>
        </div>
        `;
  }
  return weatherText;
};

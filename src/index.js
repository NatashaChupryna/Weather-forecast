import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.js_form'),
  card: document.querySelector('.js_container'),
};

// Event function
refs.form.addEventListener('submit', onSearch);

function onSearch(event) {
  event.preventDefault();
  const { searchQuery, days } = event.currentTarget.elements;
  if (!searchQuery.value) {
    Notiflix.Notify.failure('Enter your city😉');
    return;
  }
  fetchForecast(searchQuery.value, days.value).then(data =>
    markUp(data.forecast.forecastday)
  );
}

// Fetch function
const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json';
const key = '3c3e2b1141b84cdab5f190418220512';

async function fetchForecast(name, value) {
  try {
    const response = await fetch(
      `${BASE_URL}?key=${key}&q=${name}&days=${value}`
    );
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return await response.json();
  } catch (error) {
    return Notiflix.Notify.failure('Sorry, can`t find this forecast🙁');
  }
}

// Markap function
function markUp(array) {
  const markUp = array
    .map(
      item => `
      <li>
      <div class="weather_card">
        <img
          class="weather_icon"
          alt="${item.day.condition.text}"
          src="${item.day.condition.icon}"
        />
        <p>${item.date}</p>
        <div class="wtsRwe">
         <p>Av.temperature :${item.day.avgtemp_c}&#8451;</p>
          <p>Rainfall: ${item.day.daily_chance_of_rain}</p>
          <p>Wind : ${item.day.maxwind_kph} km</p>
        </div>
      </div>
      </li>`
    )
    .join('');
  refs.card.innerHTML = markUp;
}

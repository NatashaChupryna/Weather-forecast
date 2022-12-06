const refs = {
  form: document.querySelector('.js_form'),
  card : document.querySelector('.js_container')
};

// Event function
refs.form.addEventListener('submit', onSearch);

function onSearch(event) {
    event.preventDefault();
    const { searchQuery, days } = event.currentTarget.elements;
    if (!searchQuery.value) {
        alert('Enter your city😉');
        return
    };
    fetchForecast(searchQuery.value, days.value).then(data =>
      markUp(data.forecast.forecastday)
    );
}

// Fetch function
const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json';
const key = '3c3e2b1141b84cdab5f190418220512';

function fetchForecast(name, value) {
  return fetch(`${BASE_URL}?key=${key}&q=${name}&days=${value}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => console.log(error));
}


// Markap function
function markUp(array) {
 const markUp =array.map(
      item => `
      <li>
      <div class="weather_card">
        <img
          class="weather_icon"
          alt="${item.day.condition.text}"
          src="${item.day.condition.icon}"
        />
        <p>${item.date} <span>${item.day.avgtemp_c}&#8451;</span></p>
        <div class="wtsRwe">
          <div>Опади: ${item.day.daily_chance_of_rain}</div>
          <div>Вітер: ${item.day.maxwind_kph} km/hour</span>
          </div>
        </div>
      </div>
      </li>

    `
    )
        .join('');
    refs.card.innerHTML = markUp;
}

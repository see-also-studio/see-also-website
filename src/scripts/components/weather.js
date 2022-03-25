export class CurrentWeather {
  constructor(el) {
    this.el = el;
    this.updateWeather('ea2b78fb74b05873' + 'c8d64ca1e69abe37');
  }

  updateWeather(key) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?id=2643741&units=metric&appid=' + key;
    fetch(url)
    .then(data => data.json())
    .then(data => this.el.innerText = data['weather'][0]['description'] + ' in the city')
    .catch(() => console.log('current weather api request failed.'));
  }
}

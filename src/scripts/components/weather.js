export class CurrentWeather {
  constructor(el) {
    const key = 'ea2b78fb74b05873' + 'c8d64ca1e69abe37';
    this.el = el;
    this.updateWeather(key);
    setInterval(() => {
      console.info('Getting weather update');
      this.updateWeather(key);
    }, 600000);
  }

  updateWeather(key) {
    const url = 'https://api.openweathermap.org/data/2.5/weather?id=2643741&units=metric&appid=' + key;
    fetch(url)
    .then(data => data.json())
    .then(data => this.el.innerText = `${Math.round(data['main']['temp'])}°, ${data['weather'][0]['description']} in the city`)
    .catch(() => console.log('current weather api request failed.'));
  }
}

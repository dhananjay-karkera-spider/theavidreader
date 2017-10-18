'use strict';

export { WeatherService, WeatherResponse }

class WeatherApp {

    constructor() {
        this.weatherService = new WeatherService();
    }

    currentWeather(siteId) {
        var response = this.weatherService.getLocalWeather(siteId);
        return this;
    }
}

class WeatherService {
    
    constructor() {
        this.WEATHER_SERVICE_ENDPOINT = 'http://api.openweathermap.org/data/2.5/weather?id=5272232&appid=78cb8103c5e4f9baa137dc1b197a515b&units=imperial';
        //this.result = new WeatherResponse();
    }

    getLocalWeather(siteId) {

        return fetch(this.WEATHER_SERVICE_ENDPOINT)
        .then((r) => {
            if(r.ok) {
              return r.json();
            } else {
              throw new Error('Server response wasn\'t OK');
            }
          })
        .then(wr => {

            return new WeatherResponse(wr.name,
                wr.main.temp,
                wr.main.humidity,
                wr.weather,
            );
        })
        .catch(err => console.log(err));
    }

}

class WeatherResponse {
    constructor(place, temp, humidity, weather) {
        this.place = place;
        this.temperature = temp;
        this.humidity = humidity;
        this.weather = weather;
    }
}
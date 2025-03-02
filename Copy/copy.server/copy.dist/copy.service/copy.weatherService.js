import dotenv from 'dotenv';
dotenv.config();
// Define a class for the Weather object
class Weather {
    constructor(temperature, humidity, windSpeed, description) {
        this.temperature = temperature;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.description = description;
    }
}
// Complete the WeatherService class
class WeatherService {
    constructor() {
        this.baseURL = 'https://api.openweathermap.org/data/2.5/';
        this.apiKey = process.env.API_KEY;
    }
    // Create fetchLocationData method
    async fetchLocationData(query) {
        try {
            const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
            const data = await response.json();
            if (!data.length) {
                throw new Error('City not found');
            }
            return this.destructureLocationData(data[0]);
        }
        catch (error) {
            console.error('Error fetching location data:', error);
            return null;
        }
    }
    // Create destructureLocationData method
    destructureLocationData(locationData) {
        return {
            latitude: locationData.lat,
            longitude: locationData.lon,
        };
    }
    // Create buildGeocodeQuery method
    buildGeocodeQuery(city) {
        return `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
    }
    // Create buildWeatherQuery method
    buildWeatherQuery(coordinates) {
        return `${this.baseURL}weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${this.apiKey}`;
    }
    // Create fetchAndDestructureLocationData method
    async fetchAndDestructureLocationData(city) {
        const locationData = await this.fetchLocationData(city);
        return locationData ? this.destructureLocationData(locationData) : null;
    }
    // Create fetchWeatherData method
    async fetchWeatherData(coordinates) {
        try {
            const response = await fetch(this.buildWeatherQuery(coordinates));
            const data = await response.json();
            if (data.cod !== 200) {
                throw new Error('Error retrieving weather data');
            }
            return this.parseCurrentWeather(data);
        }
        catch (error) {
            console.error('Error fetching weather data:', error);
            return null;
        }
    }
    // Build parseCurrentWeather method
    parseCurrentWeather(response) {
        return new Weather(response.main.temp, response.main.humidity, response.wind.speed, response.weather[0].description);
    }
    // Complete buildForecastArray method
    buildForecastArray(currentWeather, weatherData) {
        return weatherData.map((data) => new Weather(data.main.temp, data.main.humidity, data.wind.speed, data.weather[0].description));
    }
    // Complete getWeatherForCity method
    async getWeatherForCity(city) {
        const coordinates = await this.fetchAndDestructureLocationData(city);
        if (!coordinates)
            return null;
        return await this.fetchWeatherData(coordinates);
    }
}
export default new WeatherService();

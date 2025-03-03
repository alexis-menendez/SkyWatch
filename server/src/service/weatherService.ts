// Import modules
import dotenv from 'dotenv';
dotenv.config(); // Load local environment variables

// COMPLETEDTODO: Define an interface for the Coordinates object
// This interface defines the structure of the Coordinates object (latitude and longitude)
interface Coordinates {
  latitude: number;
  longitude: number;
}

// COMPLETEDTODO: Define a class for the Weather object
// This class defines the structure of the Weather object (temperature, humidity, wind speed, and description)
class Weather {
  temperature: number;
  humidity: number;
  windSpeed: number;
  description: string;

  constructor(temperature: number, humidity: number, windSpeed: number, description: string) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.description = description;
  }
}

// COMPLETEDTODO: Complete the WeatherService class
class WeatherService {
    // COMPLETEDTODO: Define the baseURL and API key
  private baseURL: string; // base URL for the OpenWeather API
  private apiKey: string; // API key for the OpenWeather API, loaded from the .env file

  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5/';
    this.apiKey = process.env.API_KEY as string;
  }
 
  // TODO: Define the city name properties
  
  // COMPLETEDTODO: Create fetchLocationData method
  // fetches the location data (lat and long) for a given city name using the OpenWeather Geocoding API
  private async fetchLocationData(query: string): Promise<Coordinates | null> {
    try {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${this.apiKey}`);
      const data = await response.json();
  
      if (!data.length) {
        throw new Error('City not found');
      }
  
      return this.destructureLocationData(data[0]);
    } catch (error) {
      console.error('Error fetching location data:', error);
      return null;
    }
  }

  // COMPLETEDTODO: Create destructureLocationData method
  // This method extracts the latitude and longitude from the location data
  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.lat,
      longitude: locationData.lon,
    };
  }

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}

  // COMPLETEDTODO: Create buildWeatherQuery methodc
  // This method extracts the latitude and longitude from the location data
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${this.apiKey}`;
  }

  // COMPLETEDTODO: Create fetchAndDestructureLocationData method
  // This method fetches and destructures the location data for a given city name
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates | null> {
    const locationData = await this.fetchLocationData(city);
    return locationData ? this.destructureLocationData(locationData) : null;
  }

  // COMPLETEDTODO: Create fetchWeatherData method
  // This method fetches the current weather data for the given coordinates
  private async fetchWeatherData(coordinates: Coordinates): Promise<Weather | null> {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates));
      const data = await response.json();
  
      if (data.cod !== 200) {
        throw new Error('Error retrieving weather data');
      }
  
      return this.parseCurrentWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return null;
    }
  }

  // COMPLETEDTODO: Create fetchForecastData method
  // This method fetches the forecast data for the given coordinates
  private async fetchForecastData(coordinates: Coordinates): Promise<Forecast[]> {
    try {
      const response = await fetch(this.buildForecastQuery(coordinates));
      const data = await response.json();
    
      if (data.cod !== '200') {
        throw new Error('Error retrieving forecast data');
      }
    
      return this.parseForecastData(data);
    } catch (error) {
      console.error('Error fetching forecast data:', error);
      return [];
    }
  }

  // COMPLETEDTODO: Build parseCurrentWeather method
  // This method parses the current weather data from the API response
  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.main.temp,
      response.main.humidity,
      response.wind.speed,
      response.weather[0].description
    );
  }

  // COMPLETEDTODO: Build parseForecastData method
  // This method parses the forecast data from the API response
  private parseForecastData(response: any): Forecast[] {
    return response.list.map((item: any) => {
      return new Forecast(
        item.dt_txt,
        item.main.temp,
        item.main.humidity,
        item.wind.speed,
        item.weather[0].description
      );
    });
  }

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}

  // COMPLETEDTODO: Complete getWeatherForCity method
  // This method fetches the current and forecast weather data for a given city
  async getWeatherForCity(city: string): Promise<{ current: Weather | null, forecast: Forecast[] }> {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    if (!coordinates) return { current: null, forecast: [] };

    const current = await this.fetchWeatherData(coordinates);
    const forecast = await this.fetchForecastData(coordinates);

    return { current, forecast };
  }
}

export default new WeatherService(); // Export an instance of the WeatherService class

import dotenv from 'dotenv';
dotenv.config();

// Define an interface for the Coordinates object
interface Coordinates {
  latitude: number;
  longitude: number;
}

// Define a class for the Weather object
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

// Complete the WeatherService class
class WeatherService {
  private baseURL: string;
  private apiKey: string;

  constructor() {
    this.baseURL = 'https://api.openweathermap.org/data/2.5/';
    this.apiKey = process.env.API_KEY as string;
  }

  // Create fetchLocationData method
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

  // Create destructureLocationData method
  private destructureLocationData(locationData: any): Coordinates {
    return {
      latitude: locationData.lat,
      longitude: locationData.lon,
    };
  }

  // COMMENT OUT [buildGeocodeQuery method] AT COPILOTS DEBUG SUGGESTION
  // private buildGeocodeQuery(city: string): string {
  //   return `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${this.apiKey}`;
  // }


  // Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=metric&appid=${this.apiKey}`;
  }

  // Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(city: string): Promise<Coordinates | null> {
    const locationData = await this.fetchLocationData(city);
    return locationData ? this.destructureLocationData(locationData) : null;
  }

  // Create fetchWeatherData method
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

  // Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    return new Weather(
      response.main.temp,
      response.main.humidity,
      response.wind.speed,
      response.weather[0].description
    );
  }

  // COMMENT OUT [buildForecastArray method] AT COPILOTS DEBUG SUGGESTION
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
  //   return weatherData.map((data) => new Weather(
  //     data.main.temp,
  //     data.main.humidity,
  //     data.wind.speed,
  //     data.weather[0].description
  //   ));
  // }

  // Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather | null> {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    if (!coordinates) return null;

    return await this.fetchWeatherData(coordinates);
  }
}

export default new WeatherService();
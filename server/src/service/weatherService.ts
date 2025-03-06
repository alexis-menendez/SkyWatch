// Filepath to this file: skywatch/server/src/service/weatherService.ts

// Import the necessary modules
import dotenv from 'dotenv'; // Load environment variables from a .env file
dotenv.config(); // Initialize dotenv to use environment variables
import dayjs, { type Dayjs } from 'dayjs'; // Import dayjs for handling date formatting

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number; // Latitude of the location
  lon: number; // Longitude of the location
}

// TODO: Define a class for the Weather object
class Weather {
  tempF: number; // Temperature in Fahrenheit
  humidity: number; // Humidity percentage
  windSpeed: number; // Wind speed in miles per hour
  icon: string; // Weather condition icon code
  date: Dayjs | string; // Date of the weather forecast
  city: string; // City name for which the weather is fetched
  iconDescription: string; // Description of the weather condition

  constructor(
    tempF: number,
    humidity: number,
    windSpeed: number,
    icon: string,
    date: Dayjs | string,
    city: string,
    iconDescription: string
  ) {
    this.tempF = tempF;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.icon = icon;
    this.date = date;
    this.city = city;
    this.iconDescription = iconDescription;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  private baseURL: string = process.env.API_BASE_URL || ''; // Base URL for the weather API
  private apiKey: string = process.env.API_KEY || ''; // API key for authentication
  private cityName?: string; // City name for which weather data is requested

  constructor() {
    if (!this.baseURL || !this.apiKey) {
      console.error("❌ Uh oh! Missing API_BASE_URL or API_KEY in environment variables.");
    }
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string): Promise<Coordinates> {
    try {

      // Fetch location data from the API
      const response = await fetch(query);
      
      if (!response.ok) {
        throw new Error(`❌ Error: Failed to fetch location data: ${response.statusText}`);
      }
      
      const data = await response.json();

      // log success before checking data validity
      console.info("✅ Success: Successfully fetched location data from API.");
      
      // Ensure response contains valid location data
      if (!data || !data[0]) {
        throw new Error("❌ Error: No location data found for the given city.");
      }

      // Extract latitude and longitude from API response
      const { lat, lon } = data[0];
      return { lat, lon };
    } catch (error: any) {
      console.error("❌ Error: Failed fetching location data:", error.message);
      throw error;
    }
  } 

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {

    // Construct the API query to fetch latitude and longitude of a city
    return `${this.baseURL}geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {

    // Construct the API query to fetch weather data based on coordinates
    return `${this.baseURL}data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    try {
      const geoQuery = this.buildGeocodeQuery(); // Build the geolocation API query

    // log success after successful fetch
    console.info("✅ Success: Coordinates retrieved and destructured.");

      return await this.fetchLocationData(geoQuery); // Fetch location data
    } catch (error: any) {
      console.error("❌ Error: Failed fetching and destructuring location data:", error.message);
      throw error;
    }
  }

  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
    try {
      const weatherQuery = this.buildWeatherQuery(coordinates); // Build weather API query
      const response = await fetch(weatherQuery); // Fetch weather data from API

      if (!response.ok) {
        throw new Error(`❌ Error: Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json();

      // log success before checking data validity
      console.info("✅ Success: Successfully fetched weather data from API.");

      if (!data || !data.list) {
        throw new Error("❌ Error: Invalid weather data received.");
      }

      return data;
    } catch (error: any) {
      console.error("❌ Error: Failed fetching weather data:", error.message);
      throw error;
    }
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather {
    if (!response.list || response.list.length === 0) {
      throw new Error("❌ Error: Weather data is empty.");
    }

    const data = response.list[0]; // Extract the most recent weather data
    const parsedDate = dayjs.unix(data.dt).format('MM/DD/YYYY'); // Format the date

    // log success prior to creating the Weather object
    console.info("✅ Success: Successfully parsed current weather data.");

    // Create a Weather object using API response data
    return new Weather(
      data.main.temp,
      data.main.humidity,
      data.wind.speed,
      data.weather[0].icon,
      parsedDate,
      this.cityName || "Unknown City",
      data.weather[0].description,
    );
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    const weatherForecast: Weather[] = [currentWeather]; // Initialize the forecast array with current weather

    // Filter API response to get specific daily forecasts at 12:00 PM
    // Tried something else first, didn't work. Trying this now? It's a Copilot suggestion so idk uuuhhgggg
    const dailyForecasts = weatherData.filter((data: any) => data.dt_txt.includes('12:00:00'));

    for (const day of dailyForecasts) {

      // Add each daily forecast to the array
      weatherForecast.push(new Weather(
        day.main.temp,
        day.main.humidity,
        day.wind.speed,
        day.weather[0].icon,
        dayjs.unix(day.dt).format('MM/DD/YYYY'),
        this.cityName || "Unknown City",
        day.weather[0].description,
      ));
    }

    // log success after building the forecast array
    console.info(`✅ Success: Built a forecast array with ${weatherForecast.length} entries.`);

    return weatherForecast; // Return the array containing the full weather forecast
  }

  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string): Promise<Weather[]> {
    try {
      this.cityName = city; // Set the city name for the request

      console.log(`🌦️ Fetching weather data for: ${city}`);

      // 1. Get coordinates for the city
      const coordinates = await this.fetchAndDestructureLocationData();

      // 2. Fetch weather data using coordinates
      const weatherData = await this.fetchWeatherData(coordinates);

      // 3. Parse current weather conditions
      const currentWeather = this.parseCurrentWeather(weatherData);

       // log right before returning the final forecast
       console.info(`✅ Success: Weather data retrieval complete for city: ${city}`);

      // 4. Build the 5-day forecast and return it
      return this.buildForecastArray(currentWeather, weatherData.list);
    } catch (error: any) {
      console.error(`❌ Error: Failed retrieving weather data for city (${city}):`, error.message);
      throw error;
    }
  }
}

// Export an instance of the WeatherService class for use in other parts of the application
export default new WeatherService();

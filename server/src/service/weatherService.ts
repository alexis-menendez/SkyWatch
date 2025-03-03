// import modules & environment variable configuration
import dotenv from 'dotenv';
dotenv.config();
import dayjs, { type Dayjs } from 'dayjs';

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather { // Declares a class named Weather
  tempF: number;  // Temperature in Fahrenheit
  icon: string;   // URL or code representing the weather icon
  iconDescription: string;  // Text description of the weather condition (e.g., "clear sky")
  humidity: number;  // Humidity percentage
  windSpeed: number; // Wind speed in mph
  date: Dayjs | string;  // The date the weather data corresponds to (either as a Dayjs object or a string)
  city: string;  // The name of the city the weather data is for

  constructor( // The constructor initializes a Weather object with the given values
    tempF: number,
    icon: string,
    iconDescription: string,
    humidity: number,
    windSpeed: number,
    date: Dayjs | string,
    city: string
  ) {
    this.tempF = tempF;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.date = date;
    this.city = city;
  }
}

// TODO: Complete the WeatherService class
class WeatherService { //Declares a class named WeatherService
  
// TODO: Define the baseURL, API key, and city name properties
private baseURL: string = process.env.API_BASE_URL || ''; // Stores the base URL of the weather API, pulled from .env
private apiKey: string = process.env.API_KEY || ''; // Stores the API key needed to authenticate requests to the weather API
private cityName?: string; // Stores the city name for which weather data is being requested

constructor() { 
  // 1. Check if API_BASE_URL or API_KEY are missing
  if (!this.baseURL || !this.apiKey) {
    console.error(`🚨 Missing API credentials:`);
    
    if (!this.baseURL) console.error(`❌ Missing API_BASE_URL. Check your .env file.`);
    if (!this.apiKey) console.error(`❌ Missing API_KEY. Check your .env file.`);
    
    throw new Error(`❌ WeatherService initialization failed: Missing required API credentials.`);
  }

  console.log(`✅ WeatherService initialized successfully.`);
}

// TODO: Create fetchLocationData method
private async fetchLocationData(query: string): Promise<Coordinates> {
  try {
    console.log(`📍 Fetching location data from: ${query}`);

    const response = await fetch(query);

    // 1. Handle API request failures
    if (!response.ok) {
      console.error(`🚨 Failed to fetch location data. Status: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to retrieve location data. API responded with: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // 2. Handle empty or missing data
    if (!data || !data[0]) {
      console.error(`🚨 Location data response is empty or malformed. Response:`, data);
      throw new Error(`No location data found. The API did not return valid results.`);
    }

    // 3. Extract latitude and longitude
    const { lat, lon } = data[0];
    console.log(`✅ Location data received: lat=${lat}, lon=${lon}`);
    
    return { lat, lon };
  } catch (error: any) {
    console.error(`❌ Error in fetchLocationData:`, error.message);
    throw new Error(`Failed to retrieve location coordinates. ${error.message}`);
  }
}

    // TODO: Create destructureLocationData method
    const { lat, lon } = data[0]; // Destructures lat (latitude) and lon (longitude) from the first result in the API response
    return { lat, lon };
  }

  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    // Example: https://api.openweathermap.org/geo/1.0/direct?q=City&limit=1&appid=API_KEY
    return `${this.baseURL}geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
  }

  // TODO: Create buildWeatherQuery method
  // Temperature units: uses imperial (units=imperial)
  private buildWeatherQuery(coordinates: Coordinates): string { // Private method that generates a weather API URL using latitude and longitude, returning it as a string.
    // Example: https://api.openweathermap.org/data/2.5/forecast?lat=xx&lon=yy&appid=API_KEY&units=imperial
    return `${this.baseURL}data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`; // Builds a forecast API URL with base URL, location coordinates, API key, and imperial units. 
  }

  // TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData(): Promise<Coordinates> {
    const geoQuery = this.buildGeocodeQuery();
    return this.fetchLocationData(geoQuery);
  }

// TODO: Create fetchWeatherData method
private async fetchWeatherData(coordinates: Coordinates): Promise<any> {
  try {
    const weatherQuery = this.buildWeatherQuery(coordinates);
    console.log(`🌍 Fetching weather data from: ${weatherQuery}`);

    const response = await fetch(weatherQuery);

    // 1. Handle API response errors
    if (!response.ok) {
      console.error(`🚨 API request failed for "${this.cityName || 'unknown location'}" with status: ${response.status} ${response.statusText}`);
      throw new Error(`Failed to fetch weather data for "${this.cityName || 'unknown location'}". API responded with: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // 2. Handle empty or missing data structure
    if (!data || !data.list) {
      console.error(`🚨 API response for "${this.cityName || 'unknown location'}" is missing required 'list' field. Response:`, data);
      throw new Error(`Invalid weather data received for "${this.cityName || 'unknown location'}". Missing 'list' field.`);
    }

    console.log(`✅ Successfully fetched weather data for "${this.cityName}"`);
    return data;
  } catch (error: any) {
    console.error(`❌ Error in fetchWeatherData for "${this.cityName || 'unknown location'}":`, error.message);
    throw new Error(`Failed to retrieve weather data for "${this.cityName || 'unknown location'}". ${error.message}`);
  }
}

  // TODO: Build parseCurrentWeather method
private parseCurrentWeather(response: any): Weather {
  if (!response.list) {
    console.error(`🚨 API response missing 'list' field for "${this.cityName || 'unknown location'}":`, response);
    throw new Error(`Weather data response is missing 'list' field for "${this.cityName || 'unknown location'}".`);
  }
  
  if (response.list.length === 0) {
    console.error(`🚨 Weather data received but contains no entries for "${this.cityName || 'unknown location'}".`, response);
    throw new Error(`Weather data is empty for "${this.cityName || 'unknown location'}".`);
  }

    const data = response.list[0];
    const parsedDate = dayjs.unix(data.dt).format('MM/DD/YYYY');

    // Build and return a Weather object for the current weather
    return new Weather(
      data.main.temp,
      data.weather[0].icon,
      data.weather[0].description,
      data.main.humidity,
      data.wind.speed,
      parsedDate,
      this.cityName || 'Unknown City'
    );
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]): Weather[] {
    // Start with the current weather as the first entry
    const weatherForecast: Weather[] = [currentWeather];

    // Filter for daily forecasts at 12:00:00
    const dailyForecasts = weatherData.filter((item: any) => item.dt_txt.includes('12:00:00'));

    for (const day of dailyForecasts) {
      const parsedDate = dayjs.unix(day.dt).format('MM/DD/YYYY');
      weatherForecast.push(
        new Weather(
          day.main.temp,
          day.weather[0].icon,
          day.weather[0].description,
          day.main.humidity,
          day.wind.speed,
          parsedDate,
          this.cityName || 'Unknown City'
        )
      );
    }

    return weatherForecast;
  }

// TODO: Complete getWeatherForCity method
public async getWeatherForCity(city: string): Promise<Weather[]> {
  try {
    this.cityName = city;
    console.log(`🌦️ Retrieving weather forecast for "${city}"...`);

    // 1. Get coordinates from geocoding
    console.log(`📍 Fetching coordinates for "${city}"...`);
    const coordinates = await this.fetchAndDestructureLocationData();
    console.log(`✅ Coordinates received: lat=${coordinates.lat}, lon=${coordinates.lon}`);

    // 2. Fetch forecast data
    console.log(`🌍 Requesting weather forecast data for "${city}"...`);
    const weatherData = await this.fetchWeatherData(coordinates);
    console.log(`✅ Weather data successfully retrieved for "${city}".`);

    // 3. Parse current weather
    console.log(`⏳ Processing current weather data...`);
    const currentWeather = this.parseCurrentWeather(weatherData);
    console.log(`✅ Current weather data processed.`);

    // 4. Build and return forecast array (including current as the first entry)
    console.log(`🔄 Organizing forecast data for "${city}"...`);
    const forecast = this.buildForecastArray(currentWeather, weatherData.list);
    console.log(`✅ Forecast data for "${city}" is ready.`);

    return forecast;
  } catch (error: any) {
    console.error(`⚠️ Unable to fetch or process weather data for "${city}". Reason:`, error.message);
    throw error;
  }
}


// 11) Single Weather class is used; merges current weather into the first entry; uses imperial
export default new WeatherService();

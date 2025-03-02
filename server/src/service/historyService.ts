import fs from 'fs/promises'; // ✅ Use fs/promises for async file handling
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// Resolve __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const historyFilePath = path.join(__dirname, '../../db/searchHistory.json');

// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4(); // Generate unique ID for each city
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  // TODO: Define a read method that reads from the searchHistory.json file
  static async read(): Promise<City[]> {
    try {
      // Check if the file exists, otherwise create it
      const data = await fs.readFile(historyFilePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // If file does not exist, create an empty one
        await fs.writeFile(historyFilePath, JSON.stringify([]), 'utf-8');
        return [];
      }
      console.error('Error reading search history:', error);
      return [];
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  static async write(cities: City[]): Promise<void> {
    try {
      await fs.writeFile(historyFilePath, JSON.stringify(cities, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  static async getCities(): Promise<City[]> {
    return await this.read();
  }

  // TODO: Define an addCity method that adds a city to the searchHistory.json file
  static async addCity(cityName: string): Promise<City> {
    const cities = await this.read();
    const newCity = new City(cityName);

    // Check if city already exists in history
    if (!cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
      cities.push(newCity);
      await this.write(cities);
    }

    return newCity;
  }

  // TODO: BONUS: Define a removeCity method that removes a city from the searchHistory.json file
  static async removeCity(cityId: string): Promise<boolean> {
    let cities = await this.read();
    const initialLength = cities.length;
    cities = cities.filter(city => city.id !== cityId);

    if (cities.length < initialLength) {
      await this.write(cities);
      return true;
    }
    return false;
  }
}

export default HistoryService;

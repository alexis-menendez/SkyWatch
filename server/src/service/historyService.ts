// import modules
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// COMPLETED: Resolve __dirname & __filename in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const historyFilePath = path.join(__dirname, '../../db/searchHistory.json'); // Define the path to the searchHistory.json file

// COMPLETED: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4();
    this.name = name;
  }
}

// COMPLETED: Complete the HistoryService class
class HistoryService { // Define the HistoryService class
  // COMPLETED: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> { // Define the read method
    try {
      const data = await fs.readFile(historyFilePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        await fs.writeFile(historyFilePath, JSON.stringify([]), 'utf-8');
        return [];
      }
      console.error('Error reading search history:', error);
      return [];
    }
  }

  // COMPLETED: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]): Promise<void> { // Define the write method
    try {
      await fs.writeFile(historyFilePath, JSON.stringify(cities, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }

  // COMPLETED: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> { // Define the getCities method
    return await this.read();
  }

  // COMPLETED Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string): Promise<City> { // Define the addCity method
    const cities = await this.read();
    const newCity = new City(cityName);

    if (!cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
      cities.push(newCity);
      await this.write(cities);
    }

    return newCity;
  }

  // * COMPLETED: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(cityId: string): Promise<boolean> { // Define the removeCity method
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

export default new HistoryService(); // Export an instance of the HistoryService class

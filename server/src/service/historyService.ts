import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const historyFilePath = path.join(__dirname, '../../db/searchHistory.json');

// Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(name: string) {
    this.id = uuidv4(); // Generate unique ID for each city
    this.name = name;
  }
}

// Complete the HistoryService class
class HistoryService {
  // Read the search history from the JSON file
  static read(): City[] {
    try {
      if (!fs.existsSync(historyFilePath)) {
        fs.writeFileSync(historyFilePath, JSON.stringify([]), 'utf-8'); // Create file if missing
        return [];
      }
      const data = fs.readFileSync(historyFilePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error) {
      console.error('Error reading search history:', error);
      return [];
    }
  }

  // Write the updated cities array to the searchHistory.json file
  static write(cities: City[]) {
    try {
      fs.writeFileSync(historyFilePath, JSON.stringify(cities, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing search history:', error);
    }
  }

  // Get cities from the searchHistory.json file
  static getCities(): City[] {
    return this.read();
  }

  // Add a city to the searchHistory.json file
  static addCity(cityName: string): City {
    const cities = this.read();
    const newCity = new City(cityName);

    // Check if city already exists in history
    if (!cities.some(city => city.name.toLowerCase() === cityName.toLowerCase())) {
      cities.push(newCity);
      this.write(cities);
    }

    return newCity;
  }

  // Remove a city from the searchHistory.json file
  static removeCity(cityId: string): boolean {
    let cities = this.read();
    const initialLength = cities.length;
    cities = cities.filter(city => city.id !== cityId);

    if (cities.length < initialLength) {
      this.write(cities);
      return true;
    }
    return false;
  }
}

export default HistoryService;
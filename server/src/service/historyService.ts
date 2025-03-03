// import modules
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// resolve __dirname & __filename in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// define the path to the searchHistory.json file
const historyFilePath = path.join(__dirname, '../../db/searchHistory.json'); 

// TODO: Define a City class with name and id properties
class City {
  name: string;
  id: string;
  constructor(
    name: string,
    id: string
  ) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService { // Define the HistoryService class
  
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() { // Define the read method
    try {
      const data = await fs.promises.readFile('./db/db.json', 'utf8');
      console.log(data);
      return data ? data : '[]';
    } catch (err) {
      console.error('Error reading file:', err);
      return '[]'; 
    }
  }
  
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) { // Define the write method
    try {
      await fs.promises.writeFile('./db/db.json', JSON.stringify(cities, null, 2));
    } catch (err) {
      console.error('Error writing file:', err);
    }
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    const data = await this.read();
    try {
      const citiesArray = JSON.parse(data);
      console.log(citiesArray);
      return Array.isArray(citiesArray) ? citiesArray : [];
    } catch (err) {
      console.error('Error parsing JSON:', err);
      return [];
    }
  }

  // TODO: Define an addCity method that adds a city to the searchHistory.json file
async addCity(cityName: string): Promise<City | null> {
  const cities = await this.getCities(); // Ensure we get parsed city data
  const cityExists = cities.some(city => city.name.toLowerCase() === cityName.toLowerCase());

  if (cityExists) {
    return null; // Return null if city already exists
  }

  const newCity = new City(cityName, uuidv4());
  cities.push(newCity);
  await this.write(cities); // Ensure the data is properly written before returning

  return newCity; // Return the newly added city
}

  
// TODO: Define a removeCity method that removes a city from the searchHistory.json file
async removeCity(cityId: string): Promise<City[]> {
  let cities = await this.getCities(); // Use getCities() for properly parsed data
  const initialLength = cities.length;
  cities = cities.filter(city => city.id !== cityId);

  if (cities.length < initialLength) {
    await this.write(cities); // Ensure the file write is completed before returning
  }

  return cities; // Return the updated array of cities
}

export default new HistoryService(); // Export an instance of the HistoryService class

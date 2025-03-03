// import modules
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4 } from 'uuid';

// resolve __dirname & __filename in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// define the path to the searchHistory.json file
const historyFilePath = path.join(__dirname, '../../db/db.json');

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
private async read(): Promise<string> {
  try {
    console.log(`📂 Attempting to read from: ${historyFilePath}`);
    
    const data = await fs.readFile(historyFilePath, 'utf8');

    if (!data.trim()) {
      console.warn(`⚠️ Warning: File ${historyFilePath} is empty. Returning an empty array.`);
      return '[]'; 
    }

    console.log(`✅ Successfully read from ${historyFilePath}`);
    return data;
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      console.error(`🚨 Error: File ${historyFilePath} not found. Returning an empty array.`);
    } else {
      console.error(`❌ Error reading file ${historyFilePath}:`, err.message);
    }
    return '[]';
  }
}
  
// TODO: Define a write method that writes the updated cities array to the searchHistory.json file
private async write(cities: City[]) { // Define the write method
  try {
    console.log(`💾 Writing ${cities.length} cities to file "${historyFilePath}"...`);
    
    const jsonData = JSON.stringify(cities, null, 2);
    await fs.writeFile(historyFilePath, jsonData, 'utf8');
    
    console.log(`✅ Successfully wrote ${cities.length} cities to "${historyFilePath}"`);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      console.error(`🚨 File not found: "${historyFilePath}". Make sure the directory exists.`);
    } else if (err.code === 'EACCES') {
      console.error(`🚨 Permission denied: Unable to write to "${historyFilePath}". Check file permissions.`);
    } else if (err.code === 'EMFILE') {
      console.error(`🚨 Too many open files: Unable to write to "${historyFilePath}". Try closing unused applications or restarting your system.`);
    } else {
      console.error(`❌ Error writing to file "${historyFilePath}":`, err.message);
    }
    throw new Error(`Failed to write search history. ${err.message}`);
  }
}

// TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
async getCities(): Promise<City[]> {
  const data = await this.read();
  try {
    console.log(`📄 Parsing city data from file: "${historyFilePath}"`);
    const citiesArray = JSON.parse(data);
    
    if (!Array.isArray(citiesArray)) {
      console.warn(`⚠️ Unexpected data format in "${historyFilePath}". Expected an array but received:`, citiesArray);
      return [];
    }
    
    console.log(`✅ Successfully parsed ${citiesArray.length} cities from "${historyFilePath}"`);
    return citiesArray;
  } catch (err: any) {
    console.error(`❌ Error parsing JSON from "${historyFilePath}":`, err.message);
    return [];
  }
}

// TODO: Define an addCity method that adds a city to the searchHistory.json file
async addCity(cityName: string): Promise<City | null> {
  console.log(`➕ Attempting to add city: "${cityName}"`);
  
  const cities = await this.getCities(); // Ensure we get parsed city data
  
  if (!Array.isArray(cities)) {
    console.error(`🚨 Data corruption detected in "${historyFilePath}". Expected an array but found:`, cities);
    return null;
  }
  
  const cityExists = cities.some(city => city.name.toLowerCase() === cityName.toLowerCase());
  
  if (cityExists) {
    console.warn(`⚠️ City "${cityName}" already exists in "${historyFilePath}". Skipping addition.`);
    return null; // Return null if city already exists
  }
  
  try {
    const newCity = new City(cityName, uuidv4());
    cities.push(newCity);
    console.log(`✅ New city added: "${cityName}" with ID: ${newCity.id}`);
    
    await this.write(cities); // Ensure the data is properly written before returning
    console.log(`💾 Successfully updated "${historyFilePath}" with new city: "${cityName}"`);
    
    return newCity; // Return the newly added city
  } catch (err: any) {
    console.error(`❌ Error adding city "${cityName}" to "${historyFilePath}":`, err.message);
    return null;
  }
}

// TODO: Define a removeCity method that removes a city from the searchHistory.json file
async removeCity(cityId: string): Promise<City[]> {
  console.log(`🗑️ Attempting to remove city with ID: "${cityId}"`);
  
  let cities = await this.getCities(); // Use getCities() for properly parsed data
  
  if (!Array.isArray(cities)) {
    console.error(`🚨 Data corruption detected in "${historyFilePath}". Expected an array but found:`, cities);
    return cities;
  }
  
  const initialLength = cities.length;
  cities = cities.filter(city => city.id !== cityId);
  
  if (cities.length === initialLength) {
    console.warn(`⚠️ City with ID "${cityId}" not found in "${historyFilePath}". No changes made.`);
    return cities;
  }
  
  try {
    await this.write(cities); // Ensure the file write is completed before returning
    console.log(`✅ Successfully removed city with ID: "${cityId}" from "${historyFilePath}"`);
  } catch (err: any) {
    console.error(`❌ Error removing city with ID "${cityId}" from "${historyFilePath}":`, err.message);
  }
  
  return cities; // Return the updated array of cities
}

export default new HistoryService(); // Export an instance of the HistoryService class

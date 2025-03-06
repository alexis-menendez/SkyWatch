// Filepath to this file: skywatch/server/src/service/historyService.ts

// Import the necessary modules
import fs from 'fs'; 
import { v4 as uuidv4 } from 'uuid'; 

// TODO: Define a City class with name and id properties
class City {
  name: string; // Name of the city
  id: string; // Unique identifier for the city

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {

  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {

    // Log attempt before reading
    console.info('Attempting to read from db.json');

    // Read the contents of the JSON file and return it as a string
    return await fs.promises.readFile('./db/db.json', 'utf8');
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {

    // Convert the array of City objects into a JSON string and write to the file
    
    // commented out, was causing errors (see attempted fix below)
    // fs.writeFile('./db/db.json', JSON.stringify(cities), (err) => {
    
    // attempted fix
    fs.writeFile('./db/db.json', JSON.stringify(cities), (err) => {
      if (err) {
        console.log(err);
        return err.message;
      } else {
        console.log('✅ Success: File written successfully\n');
        return '✅ Success: File written successfully';
      }
    });
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {

    // Log attempt
    console.info('Attempting to retrieve city list from db.json');

    // Read the file content
    const data = await this.read();
    console.log("Get Cities: ", data); 

    // Convert JSON string to array of City objects
    if (data === undefined) {
      return [];
    }
    const citiesArray = JSON.parse(data);

    // ADDED: Log success
    console.info('✅ Success: Successfully parsed city list from db.json');

    return citiesArray;
  }

  // TODO: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {

  // log attempt
  console.info(`Attempting to add city: "${city}"`);

    // Create a new City object with a unique ID
    const tempCity = new City(city, uuidv4());

    // Retrieve the current list of cities
    const currentCitiesData = await this.getCities(); 

    // Add the new city to the array
    currentCitiesData.push(tempCity); 

    // Write the updated array back to the file
    this.write(currentCitiesData);

    // log success
    console.info(`✅ Success: City "${city}" added to db.json`);
  }

  // TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {

    // log attempt
    console.info(`Attempting to remove city with ID: "${id}"`);

    // Retrieve the current list of cities
    const currentCitiesData = await this.getCities();

    // Filter out the city with the given ID
    const updatedCitiesData = currentCitiesData.filter(city => city.id !== id);

    // Write the updated array back to the file
    await this.write(updatedCitiesData);

    // log success
    console.info(`✅ Success: City with ID "${id}" removed from db.json`);

    // Return the updated list of cities
    return updatedCitiesData;
  }
}

// Export an instance of the HistoryService class for use in other parts of the application
export default new HistoryService();

// Filepath to this file: skywatch/server/src/service/historyService.ts

// Import the necessary modules
import fs from 'fs'; // File system module for reading and writing files
import { v4 as uuidv4 } from 'uuid'; // UUID package to generate unique IDs

// TODO: Define a City class with name and id properties
class City {
  name: string; // Name of the city
  id: string; // Unique identifier for the city

  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// TODO: Complete the HistoryService class  (OUR CRUD Methods)
class HistoryService {

  // TODO: Define a read method that reads from the searchHistory.json file
  private async read() {

    // Read the contents of the JSON file and return it as a string
    return await fs.promises.readFile('./db/db.json', 'utf8');
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(cities: City[]) {

    // Convert the array of City objects into a JSON string and write to the file
    fs.writeFile('./db/db.json', JSON.stringify(cities), (err) => {
      if (err) {
        console.log(err);
        return err.message;
      } else {
        console.log('File written successfully\n');
        return 'File written successfully';
      }
    });
  }

  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {

    // Read the file content
    const data = await this.read();
    console.log("Get Cities: ", data); 

    // Convert JSON string to array of City objects
    if (data === undefined) {
      return [];
    }
    const citiesArray = JSON.parse(data);
    return citiesArray;
  }

  // TODO: Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string) {

    // Create a new City object with a unique ID
    const tempCity = new City(city, uuidv4());

    // Retrieve the current list of cities
    const currentCitiesData = await this.getCities(); 

    // Add the new city to the array
    currentCitiesData.push(tempCity); 

    // Write the updated array back to the file
    this.write(currentCitiesData);
  }

  // TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string) {

    // Retrieve the current list of cities
    const currentCitiesData = await this.getCities();

    // Filter out the city with the given ID
    const updatedCitiesData = currentCitiesData.filter(city => city.id !== id);

    // Write the updated array back to the file
    await this.write(updatedCitiesData);

    // Return the updated list of cities
    return updatedCitiesData;
  }
}

// Export an instance of the HistoryService class for use in other parts of the application
export default new HistoryService();

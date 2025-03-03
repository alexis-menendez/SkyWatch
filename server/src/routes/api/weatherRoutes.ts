// Import necessary modules
import { Router } from 'express';
import HistoryService from '../../service/historyService.js'; // Import HistoryService
import WeatherService from '../../service/weatherService.js'; // Import WeatherService

const router = Router(); // Create an Express router

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => { 
  
  // TODO: GET weather data from city name
  try {
    const { cityName } = req.body; // Extract city name from the request body

    if (!cityName) { // Check if city name is provided
      console.error('City name is required but was not provided.');
      return res.status(400).json({ error: 'City name is required' });
    }
    
    // TODO: save city to search history
    // Add city to search history BEFORE checking if weather data exists
    await HistoryService.addCity(cityName); 
    console.log(`City "${cityName}" added to search history.`);

    // Call the weather service to get weather data
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    if (!weatherData || !weatherData.current || !weatherData.forecast.length) { 
      console.warn(`No valid weather data found for "${cityName}".`);
      
      // Return a message indicating that no data was found
      return res.status(200).json({ message: "No Data Found", cityName });
    }

    console.log(`Weather data retrieved successfully for "${cityName}".`);
    return res.json(weatherData); // Return the retrieved weather data

  } catch (error) { // Handle errors
    console.error('Error retrieving weather data:', error);
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => { 
  try {
    const history = await HistoryService.getCities(); // Fetch stored cities
    console.log('Search history retrieved successfully.');
    return res.status(200).json(history); // Return the search history

  } catch (error) { // Handle errors
    console.error('Error retrieving search history:', error);
    return res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => { 
  try {
    const { id } = req.params; // Extract the city ID from request parameters

    if (!id) { // Check if city ID is provided
      console.error('City ID is required but was not provided.');
      return res.status(400).json({ error: 'City ID is required' });
    }

    // Attempt to remove the city from history
    const success = await HistoryService.removeCity(id);

    if (success) { // Check if the city was successfully removed
      console.log(`City with ID "${id}" deleted successfully.`);
      return res.json({ message: "City deleted successfully" });
    } else {
      console.warn(`City with ID "${id}" not found in search history.`);
      return res.status(404).json({ error: "City not found" });
    }

  } catch (error) { // Handle errors
    console.error('Error deleting city from search history:', error);
    return res.status(500).json({ error: 'Failed to delete city' });
  }
});

export default router; // Export the router

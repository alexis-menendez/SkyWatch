// Import the modules
import { Router } from 'express';
const router = Router();

// Import the services
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
    
    // TODO: GET weather data from city name
    // Extract the city name from the request body
    const cityName: string = req.body.cityName;
    console.log("Trying to find weather for city:", cityName);

    // Validate that a city name was provided
    if (!cityName) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // Fetch weather data for the given city using the WeatherService
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    // TODO: save city to search history
    // Add the searched city name to the search history
    await HistoryService.addCity(cityName);

    // Return the retrieved weather data as JSON
    return res.json(weatherData);
  } catch (error) {

    // Handle errors that may occur during the request
    console.error('Error retrieving weather data:', error);
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {

    // Retrieve the list of searched cities from the HistoryService
    const history = await HistoryService.getCities();

    // Return the history as JSON
    res.json(history);
  } catch (error) {

    // Handle errors that may occur while retrieving the history
    console.error('Error retrieving search history:', error);
    res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});

// TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {

    // Extract the city ID from the request parameters
    const { id } = req.params;

    // Validate that an ID was provided
    if (!id) {
      return res.status(400).json({ error: 'City ID is required' });
    }

    // Remove the city from the search history using the HistoryService
    await HistoryService.removeCity(id);

    // Respond with a success message
    return res.json({ message: 'City removed from search history' });
  } catch (error) {

    // Handle errors that may occur during the deletion process
    console.error('Error removing city from search history:', error);
    return res.status(500).json({ error: 'Failed to remove city from search history' });
  }
});

// Export the router so it can be used in other parts of the application
export default router;

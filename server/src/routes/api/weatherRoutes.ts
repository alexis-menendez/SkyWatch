// Filepath to this file: skywatch/server/src/routes/api/weatherRoutes.ts

// Import the modules
import {  Router, Request, Response, NextFunction as _NextFunction } from 'express';
const router = Router();

// Import the services
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data

// commented out, was causing errors (see attempted fix below)
//router.post('/', async (req, res) => {

// attempted fix
router.post('/', async (req: Request, res: Response) => {
  try {

    // TODO: GET weather data from city name
    // Extract the city name from the request body
    const cityName: string = req.body.cityName;
    console.log("🌦️ Attempting to retrieve weather data for city:", cityName);

    // Validate that a city name was provided
    if (!cityName) {
      return res.status(400).json({ error: '⚠️ Oops! A city name is required to proceed.' });
    }

    // Fetch weather data for the given city using the WeatherService
    const weatherData = await WeatherService.getWeatherForCity(cityName);

    // TODO: save city to search history
    // Add the searched city name to the search history
    await HistoryService.addCity(cityName);

    // Log successful retrieval before responding
    console.info(`🌤️ Saved ${cityName} to search history! Weather data retrieved successfully.: ${cityName}`);

    // Return the retrieved weather data as JSON
    return res.json(weatherData);
  } catch (error) {

    // Handle errors that may occur during the request
    console.error('❌ Error retrieving weather data:', error);
    return res.status(500).json({ error: '🌧️ We hit a storm! Unable to retrieve weather data.' });
  }
});

// TODO: GET search history

// commented out, was causing errors (see attempted fix below)
// router.get('/history', async (_req, res) => {

// attempted fix
router.get('/history', async (_req: Request, res: Response) => {
  try {

    // Retrieve the list of searched cities from the HistoryService
    const history = await HistoryService.getCities();

        // Log successful retrieval before responding
        console.info(`🔎 Search history retrieved successfully!`);

    // Return the history as JSON
    res.json(history);
  } catch (error) {

    // Handle errors that may occur while retrieving the history
    console.error('❌ Error retrieving search history:', error);
    res.status(500).json({ error: '🌧️ We hit a storm! Unable to retrieve search history' });
  }
});

// TODO: DELETE city from search history

// commented out, was causing errors (see attempted fix below)
// router.delete('/history/:id', async (req, res) => {

// attempted fix
router.delete('/history/:id', async (req: Request, res: Response) => {
  try {

    // Extract the city ID from the request parameters
    const { id } = req.params;

    // Validate that an ID was provided
    if (!id) {
      return res.status(400).json({ error: '⚠️ Oops! A city ID is required to proceed.' });
    }

    // Remove the city from the search history using the HistoryService
    await HistoryService.removeCity(id);

    // Log successful deletion before responding
    console.info(`🗑️ City with ID ${id} successfully removed from search history.`);

    // Respond with a success message
    return res.json({ message: '🗑️ City deleted from search history' });
  } catch (error) {

    // Handle errors that may occur during the deletion process
    console.error('❌ Error removing city from search history:', error);
    return res.status(500).json({ error: '🌧️ We hit a storm! Unable to remove city from search history' });
  }
});

// Export the router so it can be used in other parts of the application
export default router;

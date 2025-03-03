import { Router } from 'express';
import HistoryService from '../../service/historyService.js'; // import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js'; // import WeatherService from '../../service/weatherService.js';
const router = Router();

// COMPLETEDTODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => { // define the route handler
  try {
    const { city } = req.body; // extract the city name from the request body
    if (!city) { // check if city name is provided
      return res.status(400).json({ error: 'City name is required' });
    }

    const weatherData = await WeatherService.getWeatherForCity(city); // call the weather service
    if (!weatherData.current || !weatherData.forecast.length) { // check if weather data is available
      return res.status(404).json({ error: 'City not found' });
    }

    // COMPLETEDTODO: save city to search history
    await HistoryService.addCity(city); // Add city to search history

    return res.json(weatherData); // return the weather data
  } catch (error) { // handle errors
    console.error('Error retrieving weather data:', error);
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// COMPLETEDTODO: GET search history
router.get('/history', async (req, res) => { // define the route handler
  try {
    const history = await HistoryService.getCities(); // Fetch stored cities
    res.json(history); // return the search history as a JSON response
  } catch (error) { // handle errors
    res.status(500).json({ error: "Failed to retrieve search history" });
  }
});

// COMPLETEDTODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => { // define the route handler
  try {
    const success = await HistoryService.removeCity(req.params.id); // Remove city from search history
    if (success) { // check if city was removed
      res.json({ message: "City deleted successfully" });
    } else {
      res.status(404).json({ error: "City not found" });
    }
  } catch (error) { // handle errors
    res.status(500).json({ error: "Failed to delete city" });
  }
});

export default router;

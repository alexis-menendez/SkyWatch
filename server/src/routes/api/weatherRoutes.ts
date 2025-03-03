import { Router } from 'express';
import HistoryService from '../../service/historyService.js'; // import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js'; // import WeatherService from '../../service/weatherService.js';
const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    // TODO: save city to search history
    const weatherData = await WeatherService.getWeatherForCity(city);
    if (!weatherData.current || !weatherData.forecast.length) {
      return res.status(404).json({ error: 'City not found' });
    }

    // TODO: save city to search history
    await HistoryService.addCity(city); // Add city to search history

    return res.json(weatherData);
  } catch (error) {
    console.error('Error retrieving weather data:', error);
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// TODO: GET search history
router.get('/history', async (req, res) => {
  try {
    const history = await HistoryService.getCities(); // Fetch stored cities
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve search history" });
  }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => {
  try {
    const success = await HistoryService.removeCity(req.params.id);
    if (success) {
      res.json({ message: "City deleted successfully" });
    } else {
      res.status(404).json({ error: "City not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete city" });
  }
});

export default router;

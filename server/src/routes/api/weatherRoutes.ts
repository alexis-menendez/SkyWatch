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
    console.error('❌ Request validation failed: City name is required but was not provided in request body.');
    return res.status(400).json({ error: '⚠️ City name is required in the request body.' });
  }

  // TODO: save city to search history
  // Add city to search history BEFORE checking if weather data exists
  await HistoryService.addCity(cityName);
  console.log(`✅ City "${cityName}" successfully added to search history.`);

  // Call the weather service to get weather data
  const weatherData = await WeatherService.getWeatherForCity(cityName);

  if (!weatherData || !weatherData.current || !weatherData.forecast.length) { 
    console.warn(`⚠️ Weather data fetch warning: No valid weather data found for city "${cityName}".`);
    
    // Return a message indicating that no data was found
    return res.status(200).json({ message: "❌ No Data Found", cityName });
  }

  console.log(`🌤️ Weather data successfully retrieved for city "${cityName}".`);
  return res.json(weatherData); // Return the retrieved weather data

} catch (error) { // Handle errors
  console.error(`🚨 Unhandled error occurred while retrieving weather data for city "${req.body.cityName || 'UNKNOWN'}":`, error);
  return res.status(500).json({ 
    error: '❗ An unexpected error occurred while retrieving weather data.', 
    details: error.message 
  });
}

// TODO: GET search history
router.get('/history', async (_req, res) => { 
  try {
    const history = await HistoryService.getCities(); // Fetch stored cities

    if (!history || history.length === 0) { 
      console.warn('⚠️ Search history is empty. No previous searches found.');
      return res.status(200).json({ message: '🔍 No search history found.' });
    }

    console.log(`✅ Search history retrieved successfully. Total records: ${history.length}`);
    return res.status(200).json(history); // Return the search history

  } catch (error) { // Handle errors
    console.error('🚨 Error retrieving search history:', error);
    return res.status(500).json({ 
      error: '❗ Failed to retrieve search history due to an internal server error.', 
      details: error.message 
    });
  }
});

// TODO: DELETE city from search history
router.delete('/history/:id', async (req, res) => { 
  try {
    const { id } = req.params; // Extract the city ID from request parameters

    if (!id) { // Check if city ID is provided
      console.error('❌ Request validation failed: City ID is required but was not provided in the request parameters.');
      return res.status(400).json({ error: '⚠️ City ID is required in the request URL.' });
    }

    // Attempt to remove the city from history
    const success = await HistoryService.removeCity(id);

    if (success) { // Check if the city was successfully removed
      console.log(`🗑️ City with ID "${id}" successfully deleted from search history.`);
      return res.json({ message: "✅ City deleted successfully" });
    } else {
      console.warn(`⚠️ Deletion failed: City with ID "${id}" was not found in search history.`);
      return res.status(404).json({ error: "❌ City not found in search history." });
    }

  } catch (error) { // Handle errors
    console.error(`🚨 Unexpected error occurred while deleting city with ID "${req.params.id || 'UNKNOWN'}":`, error);
    return res.status(500).json({ 
      error: '❗ Failed to delete city due to an internal server error.', 
      details: error.message 
    });
  }
});

export default router; // Export the router

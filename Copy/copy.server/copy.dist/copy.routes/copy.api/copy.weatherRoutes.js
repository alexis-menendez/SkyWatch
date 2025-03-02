import { Router } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config(); // Load environment variables
const router = Router();
const API_KEY = process.env.API_KEY; // Get API key from .env file
if (!API_KEY) {
    console.error("❌ ERROR: OpenWeather API Key is missing. Make sure it's in the .env file.");
}
// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
    if (!API_KEY) {
        return res.status(500).json({ error: 'OpenWeather API Key is missing. Make sure it is in the .env file.' });
    }
    try {
        const { city } = req.body;
        if (!city) {
            return res.status(400).json({ error: 'City name is required' });
        }
        // TODO: GET weather data from city name
        // Fetch location data (latitude & longitude)
        const locationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
        const locationResponse = await axios.get(locationUrl);
        const locationData = locationResponse.data[0];
        if (!locationData) {
            return res.status(404).json({ error: 'City not found' });
        }
        const { lat, lon } = locationData;
        // Fetch weather data using latitude & longitude
        const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        const weatherResponse = await axios.get(weatherUrl);
        // TODO: save city to search history
        return res.json(weatherResponse.data); // Send weather data to client
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        return res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});
// TODO: GET search history
router.get('/history', async (_req, res) => {
    try {
        // This will be implemented in the next step when we work on search history
        res.json({ message: 'GET search history route is under construction' });
    }
    catch (error) {
        console.error('Error fetching search history:', error);
        res.status(500).json({ error: 'Failed to retrieve search history' });
    }
});
// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, res) => {
    try {
        // This will be implemented later as a bonus feature
        res.json({ message: 'DELETE city from search history route is under construction' });
    }
    catch (error) {
        console.error('Error deleting city from history:', error);
        res.status(500).json({ error: 'Failed to delete city from history' });
    }
});
export default router;

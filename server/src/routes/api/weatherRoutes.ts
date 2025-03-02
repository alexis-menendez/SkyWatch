import { Router } from 'express';
import HistoryService from '../../service/historyService.js'; // ✅ Import HistoryService

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }
    const newCity = await HistoryService.addCity(city); // ✅ Add city to search history
    return res.json(newCity);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to add city' });
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const history = await HistoryService.getCities(); // ✅ Fetch stored cities
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

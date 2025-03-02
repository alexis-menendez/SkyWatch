import { Router } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (/* req, res */) => {
  // TODO: GET weather data from city name
  // TODO: save city to search history
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  res.json({ message: "Weather history is working!" });
}); /* CHANGE: ADDED RESPONSE FOR DEBUGGING */

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req, res) => {
  res.json({ message: "Delete request received!" });
}); /* CHANGE: ADDED RESPONSE FOR DEBUGGING */

export default router;

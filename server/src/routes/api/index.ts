// Filepath to this file: skywatch/server/src/routes/api/index.ts

// Initiate the router and import the weatherRoutes
import { Router } from 'express';
const router = Router();

// Import the weatherRoutes
import weatherRoutes from './weatherRoutes.js';

// Use the weatherRoutes
router.use('/weather', weatherRoutes);

// Export the router
export default router;

// Import the Router module from Express
import { Router } from 'express';
const router = Router(); // Create an instance of the Express Router

// Import route handlers for API and HTML routes
import apiRoutes from './api/index.js'; // Handles API-related routes
import htmlRoutes from './htmlRoutes.js'; // Handles routes for serving HTML pages

// Mount the API routes under the '/api' path
router.use('/api', apiRoutes);

// Mount the HTML routes under the root ('/') path
router.use('/', htmlRoutes);

// Export the router to be used in the main application
export default router;

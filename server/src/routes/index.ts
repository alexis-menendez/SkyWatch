// Filepath to this file: skywatch/server/src/routes/index.ts

// Import the Router module from Express
import { Router } from 'express';
const router = Router(); // Create an instance of the Express Router

// Import route handlers for API and HTML routes
import apiRoutes from './api/index.js'; // Handles API-related routes
import htmlRoutes from './htmlRoutes.js'; // Handles routes for serving HTML pages

// Log all incoming requests
router.use((req: Request, res: Response, next: NextFunction) => {
    console.info(`Received ${req.method} request to: ${req.originalUrl}`);
    next();
  });

// Mount the API routes under the '/api' path
router.use('/api', apiRoutes);

// Mount the HTML routes under the root ('/') path
router.use('/', htmlRoutes);

// Error-handling middleware
router.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).send('⚠️ Server error! Something went wrong on our end');
  });

// Export the router to be used in the main application
export default router;
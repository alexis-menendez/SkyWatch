// Filepath to this file: skywatch/server/src/routes/index.ts

// Import the Router module from Express
import { Router, Request, Response, NextFunction } from 'express';
const router = Router(); // Create an instance of the Express Router

// Import route handlers for API and HTML routes
import apiRoutes from './api/index.js'; // Handles API-related routes
import htmlRoutes from './htmlRoutes.js'; // Handles routes for serving HTML pages

// commented out, was causing errors (see attempted fix below)
// Log all incoming requests
//router.use((req, res, next) => {
    //console.info(`✅ Success: Received ${req.method} request to: ${req.originalUrl}`);
    //next();
  //});

// attempted fix
// Log all incoming requests
router.use((req: Request, _res: Response, next: NextFunction) => { // added "_" in front of res, trying to debug
    console.info(`Received ${req.method} request to: ${req.originalUrl}`);
    next();
  });

// Mount the API routes under the '/api' path
router.use('/api', apiRoutes);

// Mount the HTML routes under the root ('/') path
router.use('/', htmlRoutes);

// commented out, was causing errors (see attempted fix below)
// Error-handling middleware to log any errors
//router.use((err, req, res, next) => {
    //console.error('⚠️ Oops! An error occurred in the root routes:', err.message);
  
    // Send 500 response code and an error message
    //res.status(500).json({ error: '⚠️ Server error! Something went wrong on our end' });
  //});

// attempted fix
// Error-handling middleware
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => { // added "_" in front of res & next, trying to debug
    console.error(err);
    res.status(500).send('Internal Server Error');
  });

// Export the router to be used in the main application
export default router;

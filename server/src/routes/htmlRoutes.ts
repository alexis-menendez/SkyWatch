// Filepath to this file: skywatch/server/src/routes/htmlRoutes.ts

// Import necessary modules from Node.js and Express
import path from 'node:path'; // Handles file and directory paths
import { fileURLToPath } from 'node:url'; // Converts a file URL to a file path
import { Router, Request, Response, NextFunction as _NextFunction } from 'express'; // Imports Router from Express for defining routes

// Define the __filename and __dirname in an ES module context
// In CommonJS, __filename and __dirname are available by default, but in ES modules, they need to be manually set
const __filename = fileURLToPath(import.meta.url); // Gets the file path of the current module
const __dirname = path.dirname(__filename); // Extracts the directory name from the file path

// Create an instance of the Express Router to define routes
const router = Router();

// TODO: Define route to serve index.html

// commented out, was causing errors (see attempted fix below)
// router.get('/', (_Request, _Response) => {

// attempted fix 
router.get('/', (_Request: Request, Response: Response) => {

  // commented out, was causing errors (see attempted fix below)
  // Serve the index.html file from the public directory
  // res.sendFile(path.join(__dirname, '../../public/index.html'), (err) => {

  // attempted fix 1: (didn't work, trying again)
  // Serve the index.html file from the public directory
  // Response.sendFile(path.join(__dirname, '../../client/index.html'), (err: Error) => {

  // attempted fix 2: SUCCESS!!!
  // Serve the index.html file from the public directory
  Response.sendFile(path.join(__dirname, '../../client/index.html'), (err: Error) => {

    // Callback function to log success/failure
    if (err) {

      // Error log if the file fails to send
      console.error('❌ Error: Could not serve index.html:', err);
    } else {

      // Success log if index.html is sent successfully
      console.info('🌤️ Success: index.html was served successfully!');
    }
  });
});

// Export the router so it can be used in other parts of the application
export default router;

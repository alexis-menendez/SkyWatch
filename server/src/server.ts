// Filepath to this file: skywatch/server/src/server.ts

// commented out, was causing errors (see attempted fix below)
// Import the necessary modules
// import dotenv from 'dotenv'; // Loads environment variables from a .env file
// import express from 'express'; // Import the Express framework
// dotenv.config(); // Initialize dotenv to use environment variables

// attempted fix
// Import the necessary modules
import dotenv from 'dotenv'; // Loads environment variables from a .env file
import express, { Router, Request, Response, NextFunction } from 'express'; // Import Express types
dotenv.config(); // Initialize dotenv to use environment variables

// Import the routes
import routes from './routes/index.js'; // Import the main router handling all routes

// Create an Express application instance
const app = express();

// Define the port number from environment variables or use default (3001)
const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
app.use(express.json()); // Middleware to parse incoming JSON requests
app.use(express.static('../client/dist')); // Serve static files (e.g., frontend build files)

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data (URL-encoded data)

// commented out, was causing errors (see attempted fix below)
// log every incoming request
// app.use((req, res, next) => {
    // console.info(`Received ${req.method} request at ${req.originalUrl}`);
    // next();
  // });

// attempted fix
// log every incoming request
app.use((req: Request, _res: Response, next: NextFunction) => {
    console.info(`Received ${req.method} request at ${req.originalUrl}`);
    next();
});

// TODO: Implement middleware to connect the routes
app.use(routes); // Use the imported routes to handle incoming requests

// commented out, was causing errors (see attempted fix below)
// log any unhandled errors
// app.use((err, req, res, next) => {
    // console.error(`⚠️ Oops! An error occurred in server routes: ${err.message}`);

    // respond with a 500 error and an error message
    // return res.status(500).send('⚠️ Server error! Something went wrong on our end');
// });

// attempted fix
// log any unhandled errors
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Error:', err.message);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server on the specified port and log a message when it starts
app.listen(PORT, () => 
    console.log(`Listening: Server is running on: ${PORT}`));

// Filepath to this file: skywatch/server/src/server.ts

// Import the necessary modules
import dotenv from 'dotenv'; // Loads environment variables from a .env file
import express from 'express'; // Import the Express framework
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

// TODO: Implement middleware to connect the routes
app.use(routes); // Use the imported routes to handle incoming requests

// Start the server on the specified port and log a message when it starts
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

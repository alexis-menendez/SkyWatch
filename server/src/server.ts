// Import modules
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
 
// Load local environment variables
dotenv.config();

// Import the routes
import routes from './routes/index.js';

// Create an express application to configure the server
const app = express(); // Create an express application to configure the server

// Define the port for the server
const PORT = process.env.PORT || 3001; 

//Commented out to debug, will remove if debug works
// Resolve __dirname & __filename in ES module scope
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// TODO: Serve static files of entire client dist folder
app.use(express.json());
app.use(express.static('../client/dist'));

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true }));

// TODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

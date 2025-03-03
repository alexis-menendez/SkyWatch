// Import modules
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config(); // Load local environment variables

// Import the routes
import routes from './routes/index.js';

const app = express(); // Create an express application to configure the server

const PORT = process.env.PORT || 3001; // Define the port for the server

// COMPLETEDTODO: Resolve __dirname & __filename in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// COMPLETEDTODO: Serve static files of entire client dist folder
app.use(express.static(path.resolve(__dirname, '../../client/dist')));

// COMPLETEDTODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// COMPLETEDTODO: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

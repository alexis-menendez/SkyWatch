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

try {
  const staticPath = path.resolve('../client/dist'); // Resolve absolute path for debugging
  console.log(`📂 Attempting to serve static files from: ${staticPath}`);

  app.use(express.static(staticPath));

  console.log('✅ Static file serving middleware initialized successfully.');
} catch (error) {
  console.error('🚨 Error initializing static file serving middleware:', error);
  throw new Error('❗ Failed to set up static file serving. Check if the "../client/dist" directory exists and is accessible.');
}

// TODO: Implement middleware for parsing JSON and urlencoded form data
try {
  console.log('🛠️ Initializing middleware for JSON and URL-encoded form data parsing...');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  console.log('✅ Middleware for JSON and URL-encoded form data parsing initialized successfully.');
} catch (error) {
  console.error('🚨 Error initializing middleware for request parsing:', error);
  throw new Error('❗ Failed to set up request parsing middleware. Ensure Express is configured correctly.');
}

// TODO: Implement middleware to connect the routes
try {
  console.log('🛤️ Initializing route middleware...');

  app.use(routes);

  console.log('✅ Route middleware successfully initialized.');
} catch (error) {
  console.error('🚨 Error initializing route middleware:', error);
  throw new Error('❗ Failed to set up route handling middleware. Ensure routes are properly defined and imported.');
}

// Start the server on the port
try {
  app.listen(PORT, () => {
    console.log(`🚀 Server successfully started and listening on PORT: ${PORT}`);
  });
} catch (error) {
  console.error('🚨 Critical Error: Failed to start the server.', error);
  throw new Error(`❗ Server initialization failed. Ensure the port ${PORT} is available and no other process is using it.`);
}

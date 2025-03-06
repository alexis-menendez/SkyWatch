// Filepath to this file: skywatch/server/src/server.ts

// Import the necessary modules
import dotenv from 'dotenv'; // Loads environment variables from a .env file
import express, { Router as _Router, Request as _Reqeust, Response as _Response, NextFunction as _NextFunction } from 'express';
dotenv.config(); 

// Import the routes
import routes from './routes/index.js'; 

// Create an Express application instance
const app = express();

// Define the port number from environment variables or use default (3001)
const PORT = process.env.PORT || 3001;

// TODO: Serve static files of entire client dist folder
app.use(express.json()); 
app.use(express.static('../client/dist')); 

// TODO: Implement middleware for parsing JSON and urlencoded form data
app.use(express.urlencoded({ extended: true })); 

// TODO: Implement middleware to connect the routes
app.use(routes); 

// Start the server on the specified port and log a message when it starts
app.listen(PORT, () => 
    console.log(`Listening: Server is running on: ${PORT}`));

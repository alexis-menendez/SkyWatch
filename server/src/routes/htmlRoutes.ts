// import modules
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';

// Define the router and resolve __dirname & __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (req, res) => { // define the route 
    res.sendFile(path.join(__dirname, '../../client/dist/index.html')); // send the index.html file
  });
  
  export default router; // export the router

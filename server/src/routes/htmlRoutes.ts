// Filepath to this file: skywatch/server/src/routes/htmlRoutes.ts


import path from 'node:path'; 
import { fileURLToPath } from 'node:url'; 
import { Router } from 'express'; 


const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (_req, res) => {

  // Serve the index.html file from the public directory
  res.sendFile(path.join(__dirname, '../../client/index.html'), (err: Error) => {

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

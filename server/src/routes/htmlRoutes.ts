// import modules
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';


// define the router and resolve __dirname & __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (_req, res) => {
  try {
    const filePath = path.join(__dirname, '../../client/index.html');
    
    // Log file path for debugging
    console.log(`📂 Attempting to serve index.html from: ${filePath}`);

    res.sendFile(filePath, (err) => {
      if (err) {
        console.error(`❌ Error serving index.html: ${err.message}`);
        return res.status(500).json({ 
          error: '❗ Failed to load the homepage.', 
          details: err.message 
        });
      }
      console.log('✅ index.html served successfully.');
    });
  } catch (error) {
    console.error('🚨 Unexpected error while serving index.html:', error);
    return res.status(500).json({ 
      error: '❗ An internal error occurred while loading the homepage.', 
      details: error.message 
    });
  }
});

export default router;

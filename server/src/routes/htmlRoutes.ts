// import modules
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';

// define the router and resolve __dirname & __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// COMPLETED: Define route to serve index.html
router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
export default router;

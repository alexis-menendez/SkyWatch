// import modules
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';

//Commented out to debug, will remove if debug works
// define the router and resolve __dirname & __filename
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html
router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});
export default router;

import { Router } from 'express';
const router = Router();

import weatherRoutes from './weatherRoutes.js'; // added this, commented out others to test debug
// import apiRoutes from './api/index.js';
// import htmlRoutes from './htmlRoutes.js';

router.use('/weather', weatherRoutes); // added this, commented out others to test debug
// router.use('/api', apiRoutes);
// router.use('/', htmlRoutes);

export default router;
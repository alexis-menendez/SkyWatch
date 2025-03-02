import { Router } from 'express';
const router = Router();
import apiRoutes from './api/index.js';
import htmlRoutes from './htmlRoutes.js';
import weatherRoutes from './weatherRoutes.js';
router.use('/api', apiRoutes);
router.use('/', htmlRoutes);
router.use('/weather', weatherRoutes);
export default router;

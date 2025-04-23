import express from 'express';
import { addRule, checkSensorAndNotify } from '../controllers/ruleController.js';

const router = express.Router();

router.post('/add-rule', addRule);
router.get('/check-sensor', checkSensorAndNotify);

export default router;

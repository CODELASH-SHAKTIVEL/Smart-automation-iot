import express from 'express';
import multer from 'multer';
import { estimateBill,chatWithBillAssistant } from '../controllers/ask_ai.js';

const router = express.Router();

// File upload config
const upload = multer({
  dest: './uploads/',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
});

router.post('/estimate', upload.single('bill'), estimateBill);
router.post('/chat', chatWithBillAssistant);

export default router;

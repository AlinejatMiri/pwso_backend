import { Router } from 'express';
import Faq from '../models/Faq.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ sortOrder: 1 });
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

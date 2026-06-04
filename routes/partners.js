import { Router } from 'express';
import Partner from '../models/Partner.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const partners = await Partner.find().sort({ sortOrder: 1 });
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

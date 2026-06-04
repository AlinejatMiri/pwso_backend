import { Router } from 'express';
import GalleryImage from '../models/GalleryImage.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const images = await GalleryImage.find().sort({ sortOrder: 1 });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

import { Router } from 'express';
import BlogPost from '../models/BlogPost.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

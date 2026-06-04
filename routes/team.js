import { Router } from 'express';
import TeamMember from '../models/TeamMember.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const members = await TeamMember.find().sort({ sortOrder: 1 });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

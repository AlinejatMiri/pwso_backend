import { Router } from 'express';
import ContactMessage from '../models/ContactMessage.js';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const newMessage = await ContactMessage.create({ name, email, phone, subject, message });
    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

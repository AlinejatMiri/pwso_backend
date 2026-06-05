import { Router } from 'express';
import bcrypt from 'bcrypt';
import Admin from '../../models/Admin.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt:', { username, passwordReceived: !!password });
    const admin = await Admin.findOne({ username });
    console.log('Admin found:', !!admin);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, admin.password);
    console.log('Password match:', match);
    if (!match) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    res.json({ success: true, user: { name: username } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;

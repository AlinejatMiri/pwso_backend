import { Router } from 'express';

const router = Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const adminUser = process.env.ADMIN_USERNAME || 'admin';
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === adminUser && password === adminPass) {
    return res.json({ success: true, user: { name: username } });
  }
  res.status(401).json({ error: 'Invalid credentials' });
});

export default router;

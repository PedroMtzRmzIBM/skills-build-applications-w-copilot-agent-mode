import { Router } from 'express';
import { User } from '../models';

const router = Router();

// List users
router.get('/', async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

// Create user
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    const out: any = user.toObject();
    delete out.password;
    res.status(201).json(out);
  } catch (err: any) {
    res.status(400).json({ error: err?.message ?? String(err) });
  }
});

// Get user
router.get('/:id', async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

export default router;

import { Router } from 'express';
import { Activity } from '../models';

const router = Router();

router.get('/', async (req, res) => {
  const activities = await Activity.find().populate('user', '-password');
  res.json(activities);
});

router.post('/', async (req, res) => {
  try {
    const a = await Activity.create(req.body);
    res.status(201).json(a);
  } catch (err: any) {
    res.status(400).json({ error: err?.message ?? String(err) });
  }
});

export default router;

import { Router } from 'express';
import { Workout } from '../models';

const router = Router();

router.get('/', async (req, res) => {
  const workouts = await Workout.find();
  res.json(workouts);
});

router.post('/', async (req, res) => {
  try {
    const w = await Workout.create(req.body);
    res.status(201).json(w);
  } catch (err: any) {
    res.status(400).json({ error: err?.message ?? String(err) });
  }
});

export default router;

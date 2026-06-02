import { Router } from 'express';
import { Activity, User } from '../models';

const router = Router();

// Very simple leaderboard: users ordered by total durationMinutes
router.get('/', async (req, res) => {
  const agg = await Activity.aggregate([
    { $group: { _id: '$user', totalMinutes: { $sum: '$durationMinutes' } } },
    { $sort: { totalMinutes: -1 } },
    { $limit: 20 },
  ]);

  const results = await Promise.all(agg.map(async (row: any) => {
    const user = await User.findById(row._id).select('-password');
    return { user, totalMinutes: row.totalMinutes };
  }));

  res.json(results);
});

export default router;

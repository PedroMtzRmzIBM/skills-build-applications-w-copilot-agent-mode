import { Router } from 'express';
import users from './users';
import teams from './teams';
import activities from './activities';
import leaderboard from './leaderboard';
import workouts from './workouts';

const router = Router();

router.get('/example', (req, res) => res.send('Hello from the OctoFit Tracker API!'));

router.use('/users', users);
router.use('/teams', teams);
router.use('/activities', activities);
router.use('/leaderboard', leaderboard);
router.use('/workouts', workouts);

export default router;
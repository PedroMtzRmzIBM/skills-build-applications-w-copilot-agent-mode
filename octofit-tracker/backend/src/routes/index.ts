import { Router } from 'express';

const router = Router();

// Example route
router.get('/api/example', (req, res) => {
    res.send('Hello from the OctoFit Tracker API!');
});

// Add more routes here

export default router;
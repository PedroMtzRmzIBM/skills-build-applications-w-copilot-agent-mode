import express from 'express';
import routes from './routes/index';
import connectDatabase from './config/database';

const app = express();
const PORT = Number(process.env.PORT || 8000);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDatabase()
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', routes);

export default app;
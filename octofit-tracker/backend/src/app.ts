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

app.listen(PORT, () => {
    const codespace = process.env.CODESPACE_NAME;
    let publicUrl = `http://localhost:${PORT}`;
    if (codespace) {
        // Provide a Codespaces-friendly preview URL when available.
        // Format: https://$CODESPACE_NAME-8000.app.github.dev
        publicUrl = `https://${codespace}-8000.app.github.dev`;
    }

    console.log(`Server is running on ${publicUrl}`);
});
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes/index';

const app = express();
const PORT = Number(process.env.PORT || 8000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', routes);

app.listen(PORT, () => {
    const codespace = process.env.CODESPACE_NAME;
    let publicUrl = `http://localhost:${PORT}`;
    if (codespace) {
        // Provide a Codespaces-friendly preview URL when available.
        publicUrl = `https://${codespace}-${PORT}.githubpreview.dev`;
    }

    console.log(`Server is running on ${publicUrl}`);
});
import app from './app';

const PORT = Number(process.env.PORT || 8000);
const codespace = process.env.CODESPACE_NAME;

let publicUrl = `http://localhost:${PORT}`;
if (codespace) {
    // Provide a Codespaces-friendly preview URL when available.
    // Format: https://$CODESPACE_NAME-8000.app.github.dev
    publicUrl = `https://${codespace}-8000.app.github.dev`;
}

app.listen(PORT, () => {
    console.log(`Server is running on ${publicUrl}`);
});

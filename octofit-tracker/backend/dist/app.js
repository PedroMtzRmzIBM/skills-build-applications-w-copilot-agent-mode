"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT || 8000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit-tracker';
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
mongoose_1.default.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use('/api', index_1.default);
app.listen(PORT, () => {
    const codespace = process.env.CODESPACE_NAME;
    let publicUrl = `http://localhost:${PORT}`;
    if (codespace) {
        // Provide a Codespaces-friendly preview URL when available.
        publicUrl = `https://${codespace}-${PORT}.githubpreview.dev`;
    }
    console.log(`Server is running on ${publicUrl}`);
});

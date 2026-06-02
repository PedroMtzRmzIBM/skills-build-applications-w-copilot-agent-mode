"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = Number(process.env.PORT || 8000);
const codespace = process.env.CODESPACE_NAME;
let publicUrl = `http://localhost:${PORT}`;
if (codespace) {
    // Provide a Codespaces-friendly preview URL when available.
    // Format: https://$CODESPACE_NAME-8000.app.github.dev
    publicUrl = `https://${codespace}-8000.app.github.dev`;
}
app_1.default.listen(PORT, () => {
    console.log(`Server is running on ${publicUrl}`);
});

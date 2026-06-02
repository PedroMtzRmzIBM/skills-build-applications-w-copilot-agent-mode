"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URI = void 0;
exports.connectDatabase = connectDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
exports.MONGODB_URI = MONGODB_URI;
async function connectDatabase() {
    // Keep defaults but expose the URI and connection setup in one place
    mongoose_1.default.set('strictQuery', true);
    try {
        await mongoose_1.default.connect(MONGODB_URI);
        mongoose_1.default.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });
        return mongoose_1.default;
    }
    catch (err) {
        console.error('MongoDB initial connection error:', err?.message ?? String(err));
        throw err;
    }
}
exports.default = connectDatabase;

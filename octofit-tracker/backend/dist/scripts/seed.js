"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Seed the octofit_db database with test data
 *
 * Usage:
 *  NODE_ENV=development ts-node src/scripts/seed.ts
 *
 */
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const http_1 = __importDefault(require("http"));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
async function fetchJson(url) {
    return new Promise((resolve, reject) => {
        const req = http_1.default.get(url, (res) => {
            let data = '';
            res.on('data', (chunk) => (data += chunk));
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                }
                catch (e) {
                    resolve(data);
                }
            });
        });
        req.on('error', reject);
    });
}
async function seed() {
    console.log('Seed the octofit_db database with test data');
    await mongoose_1.default.connect(MONGODB_URI);
    console.log('Connected to', MONGODB_URI);
    // Clear existing data
    await Promise.all([
        models_1.User.deleteMany({}),
        models_1.Team.deleteMany({}),
        models_1.Activity.deleteMany({}),
        models_1.Workout.deleteMany({}),
    ]);
    // Create users
    const users = await models_1.User.create([
        { name: 'Alice Moreno', email: 'alice@example.com', password: 'password123' },
        { name: 'Ben Carter', email: 'ben@example.com', password: 'password123' },
        { name: 'Chloe Zhang', email: 'chloe@example.com', password: 'password123' },
    ]);
    // Create teams
    const teams = await models_1.Team.create([
        { name: 'Morning Runners', members: [users[0]._id, users[1]._id] },
        { name: 'Evening Warriors', members: [users[2]._id] },
    ]);
    // Create workouts
    const workouts = await models_1.Workout.create([
        { title: '30-min HIIT', description: 'High intensity interval training', durationMinutes: 30, difficulty: 'hard' },
        { title: 'Yoga Flow', description: 'Relaxing vinyasa', durationMinutes: 45, difficulty: 'easy' },
    ]);
    // Create activities
    const activities = await models_1.Activity.create([
        { user: users[0]._id, type: 'run', durationMinutes: 25, calories: 280, date: new Date() },
        { user: users[1]._id, type: 'bike', durationMinutes: 40, calories: 520, date: new Date() },
        { user: users[2]._id, type: 'yoga', durationMinutes: 45, calories: 180, date: new Date() },
        { user: users[0]._id, type: 'hiit', durationMinutes: 30, calories: 400, date: new Date() },
    ]);
    console.log('Seed complete:');
    console.log(' Users:', users.length);
    console.log(' Teams:', teams.length);
    console.log(' Workouts:', workouts.length);
    console.log(' Activities:', activities.length);
    // Optional: verify via API responses if API is running
    const apiBase = process.env.API_BASE || 'http://localhost:8000/api';
    if (process.env.VERIFY_API === 'true') {
        try {
            console.log('Verifying API endpoints at', apiBase);
            const u = await fetchJson(`${apiBase}/users`);
            const t = await fetchJson(`${apiBase}/teams`);
            const a = await fetchJson(`${apiBase}/activities`);
            const w = await fetchJson(`${apiBase}/workouts`);
            console.log(' API users:', Array.isArray(u) ? u.length : 'unexpected');
            console.log(' API teams:', Array.isArray(t) ? t.length : 'unexpected');
            console.log(' API activities:', Array.isArray(a) ? a.length : 'unexpected');
            console.log(' API workouts:', Array.isArray(w) ? w.length : 'unexpected');
        }
        catch (err) {
            console.warn('API verification failed:', err?.message ?? String(err));
        }
    }
    await mongoose_1.default.disconnect();
    console.log('Disconnected. Done.');
}
seed().catch((err) => {
    console.error('Seed error:', err);
    process.exit(1);
});

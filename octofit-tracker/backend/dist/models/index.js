"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });
const activitySchema = new mongoose_1.default.Schema({
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String },
    durationMinutes: { type: Number },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
}, { timestamps: true });
const User = mongoose_1.default.model('User', userSchema);
exports.User = User;
const Team = mongoose_1.default.model('Team', teamSchema);
exports.Team = Team;
const Activity = mongoose_1.default.model('Activity', activitySchema);
exports.Activity = Activity;
const Workout = mongoose_1.default.model('Workout', workoutSchema);
exports.Workout = Workout;

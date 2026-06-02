import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, { timestamps: true });

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

const activitySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    calories: { type: Number },
    date: { type: Date, default: Date.now },
}, { timestamps: true });

const workoutSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    durationMinutes: { type: Number },
    difficulty: { type: String, enum: ['easy','medium','hard'], default: 'medium' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Team = mongoose.model('Team', teamSchema);
const Activity = mongoose.model('Activity', activitySchema);
const Workout = mongoose.model('Workout', workoutSchema);

export { User, Team, Activity, Workout };
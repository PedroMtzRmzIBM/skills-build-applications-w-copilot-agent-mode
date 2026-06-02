"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("./users"));
const teams_1 = __importDefault(require("./teams"));
const activities_1 = __importDefault(require("./activities"));
const leaderboard_1 = __importDefault(require("./leaderboard"));
const workouts_1 = __importDefault(require("./workouts"));
const router = (0, express_1.Router)();
router.get('/example', (req, res) => res.send('Hello from the OctoFit Tracker API!'));
router.use('/users', users_1.default);
router.use('/teams', teams_1.default);
router.use('/activities', activities_1.default);
router.use('/leaderboard', leaderboard_1.default);
router.use('/workouts', workouts_1.default);
exports.default = router;

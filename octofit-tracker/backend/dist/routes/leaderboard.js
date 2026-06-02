"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
// Very simple leaderboard: users ordered by total durationMinutes
router.get('/', async (req, res) => {
    const agg = await models_1.Activity.aggregate([
        { $group: { _id: '$user', totalMinutes: { $sum: '$durationMinutes' } } },
        { $sort: { totalMinutes: -1 } },
        { $limit: 20 },
    ]);
    const results = await Promise.all(agg.map(async (row) => {
        const user = await models_1.User.findById(row._id).select('-password');
        return { user, totalMinutes: row.totalMinutes };
    }));
    res.json(results);
});
exports.default = router;

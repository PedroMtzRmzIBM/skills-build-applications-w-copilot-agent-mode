"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const workouts = await models_1.Workout.find();
    res.json(workouts);
});
router.post('/', async (req, res) => {
    try {
        const w = await models_1.Workout.create(req.body);
        res.status(201).json(w);
    }
    catch (err) {
        res.status(400).json({ error: err?.message ?? String(err) });
    }
});
exports.default = router;

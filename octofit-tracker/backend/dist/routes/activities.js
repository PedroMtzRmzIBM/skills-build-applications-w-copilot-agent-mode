"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const activities = await models_1.Activity.find().populate('user', '-password');
    res.json(activities);
});
router.post('/', async (req, res) => {
    try {
        const a = await models_1.Activity.create(req.body);
        res.status(201).json(a);
    }
    catch (err) {
        res.status(400).json({ error: err?.message ?? String(err) });
    }
});
exports.default = router;

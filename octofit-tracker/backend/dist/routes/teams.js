"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    const teams = await models_1.Team.find().populate('members', '-password');
    res.json(teams);
});
router.post('/', async (req, res) => {
    try {
        const team = await models_1.Team.create(req.body);
        res.status(201).json(team);
    }
    catch (err) {
        res.status(400).json({ error: err?.message ?? String(err) });
    }
});
exports.default = router;

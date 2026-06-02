"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const models_1 = require("../models");
const router = (0, express_1.Router)();
// List users
router.get('/', async (req, res) => {
    const users = await models_1.User.find().select('-password');
    res.json(users);
});
// Create user
router.post('/', async (req, res) => {
    try {
        const user = await models_1.User.create(req.body);
        const out = user.toObject();
        delete out.password;
        res.status(201).json(out);
    }
    catch (err) {
        res.status(400).json({ error: err?.message ?? String(err) });
    }
});
// Get user
router.get('/:id', async (req, res) => {
    const user = await models_1.User.findById(req.params.id).select('-password');
    if (!user)
        return res.status(404).json({ error: 'User not found' });
    res.json(user);
});
exports.default = router;

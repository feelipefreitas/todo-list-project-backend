const express = require('express');
const router = new express.Router();

const User = require('../models/user.model');

router.post('/users/register', async (req, res) => {
    const newUser = new User(req.body);

    try {
        await newUser.save();

        res.status(201).send({
            user: newUser
        });
    } catch (e) {
        res.status(400).send({
            error: e.message
        });
    }
});

module.exports = router;
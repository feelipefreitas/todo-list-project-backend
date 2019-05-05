const express = require('express');
const router = new express.Router();
const authMiddleware = require('../middleware/auth.middleware');

const User = require('../models/user.model');

router.post('/users/register', async (req, res) => {
    const newUser = new User(req.body);

    try {
        await newUser.save();
        
        const newToken = newUser.generateAuthToken();

        res.status(201).send({
            user: newUser,
            token: newToken
        });
    } catch (e) {
        res.status(400).send({
            error: e.message
        });
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.getUserByCredentials(req.body.username, req.body.email, req.body.password);
        
        const newToken = await user.generateAuthToken();
        
        res.send({
            user,
            token: newToken
        });
    } catch (e) {
        res.status(400).send({
            error: e.message
        });
    }
});

router.post('/users/logout', authMiddleware, async (req, res) => {
   try {
       req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
       await req.user.save();
       
       res.send();
   } catch (e) {
       res.status(500).send({ error: e.message });
   } 
});

router.post('/users/logoutAll', authMiddleware, async (req, res) => {
   try {
       req.user.tokens = [];
       await req.user.save();
       res.send();
   } catch (e) {
       res.status(500).send({
           error: e.message
       });
   } 
});

module.exports = router;
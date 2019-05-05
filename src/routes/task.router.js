const express = require('express');
const router = new express.Router();
const authMiddleware = require('../middleware/auth.middleware');
const Task = require('../models/task.model');

router.get('/tasks/me', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({
            owner: req.user._id
        })
        res.send(tasks)
    } catch (e) {
        res.status(500).send({
            error: e.message
        });
    }
});

router.post('/tasks/create', authMiddleware, async (req, res) => {
    try {
        const newTask = new Task({
            ...req.body,
            owner: req.user._id
        });

        await newTask.save();

        res.status(201).send(newTask);
    } catch (e) {
        res.status(400).send({
            error: e.message
        });
    }
});

router.patch('/tasks/update/:id', authMiddleware, async (req, res) => {
    const propsToUpdate = Object.keys(req.body);
    const allowedPropsToUpdate = ['title', 'description', 'completed'];
    const isValidUpdate = propsToUpdate.every(propToUpdate => allowedPropsToUpdate.includes(propToUpdate));
    
    if(!isValidUpdate) res.status(400).send({
        error: 'Invalid property to be updated.'
    });

    const taskId = req.params.id;
    
    try {
        const taskToUpdate = await Task.findOne({
            _id: taskId,
            owner: req.user._id
        });
        
        if(!taskToUpdate) res.status(404).send({ error: 'No task found to update.' });
        
        propsToUpdate.forEach(prop => taskToUpdate[prop] = req.body[prop]);
        
        await taskToUpdate.save();
        
        res.send(taskToUpdate);
    } catch (e) {
        res.status(400).send({
            error: e.message
        });
    }
})

router.delete('/tasks/delete/:id', authMiddleware, async (req, res) => {
    const taskId = req.params.id;
    try {
        const taskToDelete = await Task.findOneAndDelete({
            _id: taskId,
            owner: req.user._id
        });

        if (!taskToDelete) res.status(400).send({
            error: 'No task found to delete.'
        });

        res.send(taskToDelete);
    } catch (e) {
        res.status(500).send({
            error: e.message
        });
    }
});

module.exports = router;
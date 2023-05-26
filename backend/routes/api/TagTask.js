const express = require("express")
const router = express.Router();
const { Op } = require('sequelize');
const { TagTask, Tag, Task } = require('../../db/models')
const { requireAuth } = require("../../utils/auth");

// get all tags and tasks
router.get('/', async (req, res) => {
    try {
        const allTaskTags = await TagTask.findAll();
        const taskTagList = allTaskTags.map((tagTask) => tagTask.toJSON());
        return res.json(taskTagList);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to retrieve task-tag associations' });
    }
});


// Create a new task-tag association
router.post('/', async (req, res) => {
    try {
        const { taskId, tagId } = req.body;

        const newTagTask = await TagTask.create({
            taskId,
            tagId
        });

        return res.json(newTagTask);
    } catch (error) {
        console.error('HERERERR', error); // Log the error
        return res.status(500).json({ message: 'Server Error' });
    }
});

// Update a task-tag association
router.put('/task-tags/:id', (req, res) => {
    const taskTagId = req.params.id;
    const { taskId, tagId } = req.body;

    // Perform validation and error handling

    // Update the specified task-tag association in the joint table based on the provided task and tag IDs

    // Return a success response or an error message
});

// Delete a task-tag association
router.delete('/task-tags/:id', (req, res) => {
    const taskTagId = req.params.id;

    // Perform validation and error handling

    // Delete the specified task-tag association from the joint table

    // Return a success response or an error message
});

module.exports = router;
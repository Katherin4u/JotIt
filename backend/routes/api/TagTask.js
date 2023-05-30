const express = require("express")
const router = express.Router();
const { Op } = require('sequelize');
const { TagTask, Tag, Task } = require('../../db/models')
const { requireAuth } = require("../../utils/auth");

// get all tags and tasks
router.get('/', requireAuth, async (req, res) => {
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
        // Extract the necessary data from the request body
        // const { tagId, taskId } = req.body;
        const { tagId, taskId } = req.body;
        // Create a new TagTask entry
        const tagTask = await TagTask.create({ tagId, taskId });

        // Return the created tagTask in the response
        res.status(201).json(tagTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create TagTask' });
    }
});

// Update a task-tag association
router.put('/:tagtaskid', requireAuth, async (req, res) => {
    const id = req.params.tagtaskid;
    const { tagId, taskId } = req.body;

    // Find the TagTask entry by ID
    const tagTask = await TagTask.findByPk(id);

    if (!tagTask) {
        return res.status(404).json({ error: 'TagTask not found' });
    }

    // Update the TagTask entry with the new data
    tagTask.tagId = tagId;
    tagTask.taskId = taskId;
    await tagTask.save();

    // Return the updated tagTask in the response
    res.json(tagTask);
});

// Delete a task-tag association
router.delete('/:tagtaskid', requireAuth, async (req, res) => {
    try {
        const id = req.params.tagtaskid;

        // Find the TagTask entry by ID
        const tagTask = await TagTask.findByPk(id);

        if (!tagTask) {
            return res.status(404).json({ error: 'TagTask not found' });
        }

        // Delete the TagTask entry
        await tagTask.destroy();

        res.json({ message: 'TagTask deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete TagTask' });
    }
});

module.exports = router;
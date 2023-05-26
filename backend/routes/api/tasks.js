const express = require('express')
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Task } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const { getAttributes } = require('sequelize/lib/model');
const router = express.Router();

// creating a task
router.post(
    '/',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id
        const { title, text, priority } = req.body;
        const task = await Task.create({ userId, title, text, priority })

        return res.json(
            task
        )
    }
);

// get all tasks associated with user
router.get(
    '/',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id
        const allTasks = await Task.findAll({
            where: {
                userId
            },
            order: [['title', 'DESC']]
        })

        return res.json(allTasks)

    }
);

// get a specific task
router.get(
    '/:taskId',
    requireAuth,
    async (req, res) => {
        // get the task id
        const taskId = parseInt(req.params.taskId, 10)
        const task = await Task.findByPK(taskId, { include: User })
        return res.json(task)
    }
);

// edit an exisiting task
router.put('/:taskId', requireAuth, async (req, res) => {
    const { title, text, priority, } = req.body;
    const taskId = req.params.taskId

    const task = await Task.findByPk(taskId)

    //checks to see if the task does not exists
    if (!task) return res.status(404).json({ message: "task not found", statusCode: 404 })


    //update the task with the new data
    const updateTask = await task.update({
        title,
        text,
        priority
    })

    return res.status(200).json(updateTask)

})


//deleting a task
router.delete('/:taskId', requireAuth, async (req, res) => {
    const taskId = req.params.taskId
    const userId = req.user.id

    const task = await Task.findByPk(taskId);

    //check to see if the task exists
    if (!task) {
        return res.status(404).json({ message: "task couldn't be found", statusCode: 403 })
    }
    // check to see if the user id matches the task user id
    if (task.userId !== userId) {
        return res.status(403).json({
            message: "Not Authorized",
            statusCode: 403
        })
    }

    await task.destroy();

    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })

})

module.exports = router;
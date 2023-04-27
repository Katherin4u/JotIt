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
        const { text, priority } = req.body;
        const task = await Task.create({ userId, text, priority })

        // return res.json(
        //     task
        // )
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

module.exports = router;
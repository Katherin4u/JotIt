const express = require('express')
const { Op } = require('sequelize');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Task } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const { getAttributes } = require('sequelize/lib/model');
const router = express.Router();

//creating a task
router.post(
    '/',
    requireAuth,
    async (req, res) => {
        const userId = req.user.id
        const { text, priority } = req.body;
        const task = await Task.create({ userId, text, priority })

        return res.json(
            task
        )
    }
);

module.exports = router;
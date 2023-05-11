const express = require("express")
const router = express.Router();
const { Op } = require('sequelize');
const { Tag } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");



// Get all tags
router.get('/', async (req, res) => {
    const allTags = await Tag.findAll();

    const tagsList = allTags.map((tag) => tag.toJSON());

    return res.json({ Tags: tagsList });
});


//post a new Tag
router.post('/',requireAuth, async (req, res) => {
    const userId = req.user.id
    const {name, color} = req.body;
    const user = await Tag.create({userId, name, color})
    return res.json({
        user
    })
})




module.exports = router;
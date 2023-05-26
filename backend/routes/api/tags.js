const express = require("express")
const router = express.Router();
const { Op } = require('sequelize');
const { Tag } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");



// Get all tags
router.get('/', async (req, res) => {
    const allTags = await Tag.findAll();

    const tagsList = allTags.map((tag) => tag.toJSON());

    return res.json(tagsList);
});


//post a new Tag
router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id
    const { name, color } = req.body;
    const user = await Tag.create({ userId, name, color })
    return res.json(
        user
    )
})

//edit an exisiting tag
router.put('/:tagId', requireAuth, async (req, res) => {
    const { name, color } = req.body;
    const tagId = req.params.tagId

    const tag = await Tag.findByPk(tagId)

    //checks to see if the tag does not exists
    if (!tag) return res.status(404).json({ message: "Tag not found", statusCode: 404 })

    //checks to see if the current user is the owner of the tag
    if (tag.userId !== req.user.id) return res.status(403).json({ message: "Not Authorized", statusCode: 403 })

    //update the Tag with the new data
    const updateTag = await tag.update({
        name,
        color
    })

    return res.status(200).json(updateTag)

})

//deleting a tag
router.delete('/:tagId', requireAuth, async (req, res) => {
    const tagId = req.params.tagId
    const userId = req.user.id

    const tag = await Tag.findByPk(tagId);

    //check to see if the tag exists
    if (!tag) {
        return res.status(404).json({ message: "Tag couldn't be found", statusCode: 403 })
    }
    // check to see if the user id matches the tag user id
    if (tag.userId !== userId) {
        return res.status(403).json({
            message: "Not Authorized",
            statusCode: 403
        })
    }

    await tag.destroy();

    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })

})

// get all tasks from a specific tag





module.exports = router;
const express = require("express")
const router = express.Router();
const { Op } = require('sequelize');
const { Notebook, Note, User } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");


//get all notebooks
router.get('/', requireAuth, async (req, res) => {
    const userId = req.user.id

    // grab all notebooks with userId
    const allNotebooks = await Notebook.findAll({
        where: { userId },
        order: [['createdAt', 'ASC']]
    });

    return res.json(allNotebooks);
});

//post a new notebook
router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id
    const { title } = req.body;
    const user = await Notebook.create({ userId, title })
    return res.json({
        user
    })
})

//edit an exisiting notebook
router.put('/:notebookId', requireAuth, async (req, res) => {
    const { title } = req.body;
    const notebookId = req.params.notebookId

    const notebook = await Notebook.findByPk(notebookId)

    //checks to see if the notebook does not exists
    if (!notebook) return res.status(404).json({ message: "Notebook not found", statusCode: 404 })

    //checks to see if the current user is the owner of the notebook
    if (notebook.userId !== req.user.id) return res.status(403).json({ message: "Not Authorized", statusCode: 403 })

    //update the notebook with the new data
    const updateNotebook = await notebook.update({
        title
    })

    return res.status(200).json(updateNotebook)

})

//deleting a notebook
router.delete('/:notebookId', requireAuth, async (req, res) => {
    const notebookId = req.params.notebookId
    const userId = req.user.id

    const notebook = await Notebook.findByPk(notebookId);

    //check to see if the notebook exists
    if (!notebook) {
        return res.status(404).json({ message: "Notebook couldn't be found", statusCode: 403 })
    }
    // check to see if the user id matches the notebook user id
    if (notebook.userId !== userId) {
        return res.status(403).json({
            message: "Not Authorized",
            statusCode: 403
        })
    }

    await notebook.destroy();

    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })

})


// create a new Note
router.post('/:notebookId/notes', requireAuth, async (req, res) => {
    const userId = req.user.id
    const notebookId = req.params.notebookId;

    const { title, subtitle, text } = req.body;

    const specificNotebook = await Notebook.findByPk(notebookId, {
        include: {
            model: Note
        }
    })
    //if the specific notebook isnt found
    if (!specificNotebook) {
        return res.status(404).json({
            message: "Notebook couldn't be found",
            statusCode: 404,
        });
    }


    const user = await Note.create({ userId, notebookId: +notebookId, title, subtitle, text })
    return res.json({
        user
    })
})

//get all notes from a specific notebook
router.get('/:notebookId/notes', async (req, res) => {
    const notebookId = req.params.notebookId

    //find the notebook with the matching id
    const notebook = await Notebook.findByPk(notebookId)

    //checks to see if the notebook was found
    if (!notebook) return res.status(404).json({ message: "Notebook not found", statusCode: 404 });

    //find all the notes for specific notebook
    // This does not need the userId, since only that user can access that notebook
    const notes = await Note.findAll({
        where: { notebookId },
    })

    return res.json(notes)
})

module.exports = router;
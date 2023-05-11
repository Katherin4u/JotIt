const express = require("express")
const router = express.Router();
const { Op } = require('sequelize');
const { Notebook, Note } = require('../../db/models');
const { requireAuth } = require("../../utils/auth");


//get all notebooks
router.get('/', async (req, res) => {
    const allNotebooks = await Notebook.findAll();

    const notebookList = allNotebooks.map((notebook) => notebook.toJSON());

    return res.json({ Notebook: notebookList });
});

//post a new notebook
router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id
    const { title } = req.body;
    const user = await Notebook.create({ userId, title})
    return res.json({
        user
    })
})

//edit an exisiting notebook
router.put('/:notebookId', requireAuth, async (req, res) => {
    const {title} = req.body;
    const notebookId = req.params.notebookId

    const notebook = await Notebook.findByPk(notebookId)

    //checks to see if the tag does not exists
    if(!notebook) return res.status(404).json({message: "Notebook not found", statusCode: 404})

    //checks to see if the current user is the owner of the tag
    if(notebook.userId !== req.user.id) return res.status(403).json({message: "Not Authorized", statusCode: 403})

    //update the Tag with the new data
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

    //check to see if the tag exists
    if(!notebook){
        return res.status(404).json({message: "Notebook couldn't be found", statusCode: 403})
    }
    // check to see if the user id matches the tag user id
    if(notebook.userId !== userId){
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
    
    const {title, subtitle, text} = req.body;

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


    const user = await Note.create({userId, notebookId: +notebookId, title, subtitle, text})
    return res.json({
        user
    })
})

//get all notes from a specific notebook


module.exports = router;
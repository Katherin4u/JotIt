const express = require("express")
const router = express.Router();
const { Op } = require('sequelize');
const { Notebook } = require('../../db/models');
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


module.exports = router;
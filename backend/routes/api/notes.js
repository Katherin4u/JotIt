const express = require("express")
const router = express.Router();
const { Op } = require('sequelize');
const { Note} = require('../../db/models');
const { requireAuth } = require("../../utils/auth");


// get all notes
router.get('/', async (req,res) => {
    const allNotes = await Note.findAll();

    const notesList = allNotes.map((note) => note.toJSON());

    return res.json({Note: notesList})
})


// updating the note
router.put('/:noteId', requireAuth, async (req, res) => {
    const {title, subtitle, text} = req.body;
    const noteId = req.params.noteId

    const note = await Note.findByPk(noteId)

    //checks to see if the note does not exists
    if(!note) return res.status(404).json({message: "Note not found", statusCode: 404})

    //checks to see if the current user is the owner of the note
    if(note.userId !== req.user.id) return res.status(403).json({message: "Not Authorized", statusCode: 403})

    //update the note with the new data
    const updateNote = await note.update({
       title,
       subtitle,
       text
    })

    return res.status(200).json(updateNote)

})

//deleting the note
router.delete('/:noteId', requireAuth, async (req, res) => {
    const noteId = req.params.noteId
    const userId = req.user.id

    const note = await Note.findByPk(noteId);

    //check to see if the note exists
    if(!note){
        return res.status(404).json({message: "Note couldn't be found", statusCode: 403})
    }
    // check to see if the user id matches the note user id
    if(note.userId !== userId){
        return res.status(403).json({
            message: "Not Authorized",
            statusCode: 403
        })
    }

    await note.destroy();

    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200
    })

}) 

module.exports = router;
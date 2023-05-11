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


module.exports = router;
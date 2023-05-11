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


// create a new Note
//! this is associated to Notebook, not finished need to add the notebookId
router.post('/', requireAuth, async (req, res) => {
    const userId = req.user.id
    
    const {title, subtitle, text} = req.body;
    const user = await Note.create({userId, title, subtitle, text})
    return res.json({
        user
    })
})

// updating the note


//deleting the note


module.exports = router;
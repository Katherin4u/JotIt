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


module.exports = router;
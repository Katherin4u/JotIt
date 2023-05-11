// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

const tagsRouter = require('./tags.js')
const noteRouter = require('./notes.js')
const notebookRouter = require('./notebooks.js')

const tasksRouter = require('./tasks.js');

const { restoreUser } = require("../../utils/auth.js");

// Connect restoreUser middleware to the API router
// If current user session is valid, set req.user to the user in the database
// If current user session is not valid, set req.user to null
router.use(restoreUser);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);



router.use('/tags', tagsRouter)

router.use('/notes', noteRouter)

router.use('/notebooks', notebookRouter)

router.use('/tasks', tasksRouter);


// router.post('/test', (req, res) => {
//     res.json({ requestBody: req.body });
// });

module.exports = router;
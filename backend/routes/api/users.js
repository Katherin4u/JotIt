const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { handleValidationErrors } = require('../../utils/validation');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');




const validateSignup = [
    check('email')
        .isEmail()
        .withMessage("Invalid email"),
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage("First Name is required"),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage("Last Name is required"),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({min: 4})
        .withMessage("Username is required"),
    check('password')
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
        const { email, password, username } = req.body;
        const user = await User.signup({ email, username, password });

        await setTokenCookie(res, user);

        return res.json({
            user: user
        });
    }
);

module.exports = router;
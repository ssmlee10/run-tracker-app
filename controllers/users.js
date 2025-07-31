const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// GET to individual users' runs
router.get('/:id', async (req, res) => {
    res.render('users/index.ejs');
})

module.exports = router;
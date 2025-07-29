const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// routers
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('runs/index.ejs', {
            runs: currentUser.runs,
        });
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
})

// get form to add a new run
router.get('/new', async (req, res) => {
  res.render('runs/new.ejs');
});


module.exports = router;
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

// post a new run
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.runs.push(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/runs`);
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
})

// get a new run's show page
router.get('/:runId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const run = currentUser.runs.id(req.params.runId);
        res.render('runs/show.ejs', {
            run: run,
        });
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
});


module.exports = router;
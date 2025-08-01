const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Run = require('../models/user.js');


// GET to the users index page
router.get('/', async (req, res) => {
    const allUsers = await User.find({});
    const userTotalDistances = [];
    allUsers.forEach((user) => {
        // console.log(user);
        // console.log(user.runs);
        let totalDistance = 0;
        user.runs.forEach((run) => {
            totalDistance += run.distance;
            // console.log(totalDistance);
        })
        userTotalDistances.push(totalDistance);
    });
    console.log(userTotalDistances);
    res.render('users/index.ejs', {users: allUsers, userTotalDistances: userTotalDistances});
});

// GET to individual users' runs
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('runs');
        res.render('users/show.ejs', { user });
    } catch(error) {
        console.log(error);
        res.redirect('/');
    }
});

module.exports = router;
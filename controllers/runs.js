const express = require("express");
const router = express.Router();

const User = require("../models/user.js");

// routers
router.get("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    res.render("runs/index.ejs", {
      runs: currentUser.runs,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// get form to add a new run
router.get("/new", async (req, res) => {
  res.render("runs/new.ejs");
});

// post a new run
router.post("/", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.runs.push(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/runs`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// get a new run's show page
router.get("/:runId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const run = currentUser.runs.id(req.params.runId);
    // calculate pace
    // take out the :
    const timeSplit = run.time.split(":");
    // parse hours, min, sec
    const hours = parseInt(timeSplit[0]);
    const min = parseInt(timeSplit[1]);
    const sec = parseInt(timeSplit[2]);
    // total time in min
    const totalTime = hours * 60 + min + sec / 60;
    // calculate pace
    const calculatedPace = totalTime / run.distance;
    // convert pace into minutes, seconds
    const paceMin = Math.floor(calculatedPace);
    const paceSec = Math.round((calculatedPace - paceMin) * 60);
    // final pace 11:15
    // toString() makes the number a string
    // padStart makes seconds 2 characters, if it's 1 character, adds a zero to the front
    const pace = `${paceMin}:${paceSec.toString().padStart(2, "0")}`;
    res.render("runs/show.ejs", {
      run: run,
      pace,
    });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// delete a run
router.delete("/:runId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    currentUser.runs.id(req.params.runId).deleteOne();
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/runs`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// get to page to edit a run
router.get("/:runId/edit", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const run = currentUser.runs.id(req.params.runId);
    res.render("runs/edit.ejs", {
      run: run,
    });
  } catch (eroor) {
    console.log(error);
    res.redirect("/");
  }
});

// put a new edit in db
router.put("/:runId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const run = currentUser.runs.id(req.params.runId);
    run.set(req.body);
    await currentUser.save();
    res.redirect(`/users/${currentUser._id}/runs/${req.params.runId}`);
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

module.exports = router;

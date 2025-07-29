const mongoose = require('mongoose');

// define run schema
const runSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    distanceUnit: {
        type: String,
        enum: ["mi", "km"],
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    // pace will be calculated on show page
    caloriesBurnt: Number,
    avgHr: Number,
    runType: {
        type: String,
        enum: ['easy', 'long', 'tempo', 'race', 'interval'],
        required: true,
    },
    notes: String,
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    runs: [runSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const {fetchIndeedData} = require('./scripts/fetchJobPostings');
const job = require('./routes/job');
const {pullDataFromIndeed} = require('./scripts/pullData');

const app = express();

// Body Parser middleware
app.use(bodyParser.urlencoded({extends: true}));
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// connect to MongoDB
const option = {
    socketTimeoutMS: 30000,
    keepAlive: true,
    reconnectTries: 30000
};
mongoose.Promise = global.Promise;
mongoose.connect(db, option).then((client, err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('MongoDB connected!')
    }
});

// Daily task
pullDataFromIndeed('web developer');

// Route
app.use('/api/job', job);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
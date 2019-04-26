const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    title: {
        required: true,
        type: String,
        max:100
    },
    tag: {
        required: true,
        type: String,
        max:100
    },
    company: {
        required: true,
        type: String,
        max:100
    },
    location: {
        required: true,
        type: String,
        max:100
    },
    summary: {
        required: true,
        type: String,
        max:100
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isSaved: {
        type: Boolean,
        default: false
    }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
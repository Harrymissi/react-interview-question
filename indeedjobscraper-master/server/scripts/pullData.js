const mongoose = require('mongoose');
const {fetchIndeedData} = require('./fetchJobPostings');
const Job = require('../models/jobs');

const pullDataFromIndeed = (keyword) => {
    const jobs = Job.find({}, (err, jobs) => {
        if (jobs && jobs.length > 100) {
            console.log(`There are ${jobs.length} job postings in MongoDB`);
        } else {
            console.log('No job postings. Data Pulling...');
            let newJobs = [];
            fetchIndeedData(keyword).then(data => {
                let job = {};
                for (let i = 0; i < data.title.length; i++) {
                    job = {
                        title: data.title[i],
                        company: data.company[i],
                        location: data.location[i],
                        summary: data.summary[i],
                        tag: data.keyword,
                        isDeleted: false
                    };
                    newJobs.push(job);
                }
                Job.collection.insert(newJobs, (err, docs) => {
                    if (err) {
                        return console.log(err);
                    } else {
                        console.log('Pulling scuccess!')
                    }
                })
            });
        }
    });
};



module.exports = { pullDataFromIndeed };

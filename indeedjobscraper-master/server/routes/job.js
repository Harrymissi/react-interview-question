const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Job = require('../models/jobs');

router.get('/test', (req, res) =>  res.json({msg: 'server works'}));;

router.post('/', (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 12;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;

    let findArgs = {};

    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === 'isSaved') {
                findArgs['isSaved'] = true;
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }

    findArgs['isDeleted'] = false;

    // console.log(findArgs);

    Job.find(findArgs)
        .skip(skip)
        .limit(limit)
        .exec((err, jobs) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({
                size: jobs.length,
                jobs
            });
        })
});

router.post('/edit_post/:id', (req, res) => {
    const newJobPost = {
        company: req.body.company,
        location: req.body.location,
        tag: req.body.tag,
        summary: req.body.summary
    };
   Job.findOneAndUpdate({'_id': req.params.id}, newJobPost, (err, job) => {
       if (err) return res.send(500, {err});
       return res.send(job)
   });
});

router.post('/delete_post/:id', (req, res) => {

    Job.findOneAndUpdate({'_id': req.params.id}, {'isDeleted': true}, (err, doc) => {
        if (err) return res.send(500, { error: err });
        return res.send(doc);
    })
});

router.post('/save_post/:id', (req, res) => {
    Job.findOneAndUpdate({'_id': req.params.id}, req.body, (err, doc) => {
        if (err) return res.send(500, { error: err });
        return res.send(doc);
    })
});

router.get('/current_job/:id', (req, res) => {
    Job.findOne({'_id': req.params.id}, (err, doc) => {
        if (err) return res.send(404, { error: err });
        return res.send(doc);
    })
});

module.exports = router;
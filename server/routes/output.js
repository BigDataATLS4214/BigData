const router = require('express').Router();
let Output = require('../models/output.model');

router.route('/').get((req, res) => {
    Output.findOne({}, {}, {sort: {'createdAt': -1}}) //get most recent document
        .then(outputs => res.json(outputs))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newOutput = new Output({
        name,
    });

    newOutput.save()
    .then(() => res.json('Output added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
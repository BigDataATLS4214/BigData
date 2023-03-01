const router = require('express').Router();
let Genre = require('../models/genre.model');

router.route('/').get((req, res) => {
    Genre.find()
        .then(genre => res.json(genre))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newGenre = new Genre({
        name
    });

    newGenre.save()
    .then(() => res.json('Genre added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
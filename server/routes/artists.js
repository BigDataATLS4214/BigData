const router = require('express').Router();
let Artist = require('../models/artist.model');

router.route('/').get((req, res) => {
    Artist.find()
        .then(artists => res.json(artists))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Artist.findById(req.params.id)
        .then(artist => res.json(artist))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newArtist = new Artist({
        name
    });

    newArtist.save()
    .then(() => res.json('Artist added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
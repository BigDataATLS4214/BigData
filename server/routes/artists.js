const router = require('express').Router();
let Artist = require('../models/artist.model');

router.route('/').get((req, res) => {
    Artist.find()
        .then(artists => res.json(artists))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const num_of_songs = Number(req.body.num_of_songs);
    const num_of_albums = Number(req.body.num_of_albums);

    const newArtist = new Artist({
        name,
        num_of_albums,
        num_of_songs,
    });

    newArtist.save()
    .then(() => res.json('Artist added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
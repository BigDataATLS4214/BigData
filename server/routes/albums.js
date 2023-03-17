const router = require('express').Router();
let Album = require('../models/album.model');

router.route('/').get((req, res) => {
    Album.find()
        .then(albums => res.json(albums))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const release_date = Date(req.body.release_date);
    const number_of_tracks = Number(req.body.num_of_tracks);
    const artists = req.body.artists; //should be an array of object ids

    const newAlbum = new Album({
       title,
       release_date,
       number_of_tracks,
       artists
    });

    newAlbum.save()
    .then(() => res.json('Album added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
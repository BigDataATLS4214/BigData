const router = require('express').Router();
let SongTitle = require('../models/song_title.model');

router.route('/').get((req, res) => {
    SongTitle.find()
        .then(song_titles => res.json(song_titles))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const title = req.body.title;
    const artists = req.body.artists;
    const genres = req.body.genres;
    const albums = req.body.albums;
    const emotions = req.body.emotions;
     

    const newSongTitle = new SongTitle({
       title,
       artists,
       genres,
       albums,
       emotions
    });

    newSongTitle.save()
    .then(() => res.json('Song title added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
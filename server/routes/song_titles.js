const router = require('express').Router();
let SongTitle = require('../models/song_titles.model');

router.route('/').get((req, res) => {
    SongTitle.find()
        .then(song_titles => res.json(song_titles))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    SongTitle.findById(req.params.id)
        .then(song_title => res.json(song_title))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:emotion_id').get((req, res) => {
    SongTitle.find({emotion: req.params.emotion_id})
        .then(song_title => res.json(song_title))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/add').post((req, res) => {
    const spotify_id = req.body.spotify_id
    const emotions = req.body.emotions;
     
    const newSongTitle = new SongTitle({
       spotify_id,
       emotions
    });

    newSongTitle.save()
    .then(() => res.json('Song title added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
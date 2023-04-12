const router = require('express').Router();
let PlaylistId = require('../models/playlist_ids.model');

router.route('/').get((req, res) => {
    PlaylistId.find()
        .then(playlist_id => res.json(playlist_id))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    PlaylistId.findById(req.params.id)
        .then(playlist_id => res.json(playlist_id))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const spotify_id = req.body.spotify_id;
     
    const newPlaylistId = new PlaylistId({
       name,
       spotify_id
    });

    newPlaylistId.save()
    .then(() => res.json('Playlist id added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

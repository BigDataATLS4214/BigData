const router = require('express').Router();
let Emotion = require('../models/emotion.model');

router.route('/').get((req, res) => {
    Emotion.find()
        .then(emotions => res.json(emotions))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Emotion.findById(req.params.id)
        .then(emotion => res.json(emotion))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:name').get((req, res) => {
    Emotion.findOne({name: req.params.name})
        .then(emotion => res.json(emotion))
        .catch(err => res.status(400).json('ErrorL ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;

    const newEmotion = new Emotion({
        name,
    });

    newEmotion.save()
    .then(() => res.json('Emotion added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
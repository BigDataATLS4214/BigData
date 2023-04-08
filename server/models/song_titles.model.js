const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songTitleSchema = new Schema({
    spotify_id:{
        type: String,
        required: true
    },
    emotions:{
        type: [ObjectId],
        requried: true
    }
}, {
    timestamps: true,
});

const SongTitle = mongoose.model('SongTitle', songTitleSchema);

module.exports = SongTitle;
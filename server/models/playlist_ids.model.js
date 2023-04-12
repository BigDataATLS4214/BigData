const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const Schema = mongoose.Schema;

const playlistIdSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    spotify_id: {
        type: String,
        required: true,
    },
    emotion_id: {
        type: ObjectId,
        required: true,
    }
}, {
    timestamps: true,
});

const PlaylistId = mongoose.model('PlaylistId', playlistIdSchema);

module.exports = PlaylistId;
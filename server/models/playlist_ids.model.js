const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const playlistIdSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    spotify_id: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,
});

const PlaylistId = mongoose.model('PlaylistId', playlistIdSchema);

module.exports = PlaylistId;
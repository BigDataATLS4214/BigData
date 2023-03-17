const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const albumSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    release_date: {
        type: Date,
        required: true
    },
    number_of_tracks: {
        type: Number,
        required: true
    },
    artists:{ //should be array of object ids
        type: Array,
        requried: true
    }
}, {
    timestamps: true,
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
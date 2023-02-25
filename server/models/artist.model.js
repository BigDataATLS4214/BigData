const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const artistSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    number_of_songs: {
        type: Number,
        required: true
    },
    number_of_albums: {
        type: Number,
        required: true
    }
}, {
    timestamps: true,
});

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;

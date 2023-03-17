const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const songTitleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    artists: {
        type: Array,
        required: true
    },
    genres: {
        type: Array,
        required: true
    },
    albums:{ 
        type: Array,
        requried: true
    },
    emotions:{
        type: Array,
        requried: true
    }
}, {
    timestamps: true,
});

const SongTitles = mongoose.model('SongTitle', songTitleSchema);

module.exports = SongTitles;
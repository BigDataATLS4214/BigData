const { ObjectId } = require('mongodb');
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
        type: [ObjectId],
        required: true
    },
    genres: {
        type: [ObjectId],
        required: true
    },
    albums:{ 
        type: [ObjectId],
        requried: true
    },
    emotions:{
        type: [ObjectId],
        requried: true
    }
}, {
    timestamps: true,
});

const SongTitles = mongoose.model('SongTitle', songTitleSchema);

module.exports = SongTitles;
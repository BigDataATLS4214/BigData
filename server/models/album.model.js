const { ObjectId } = require('mongodb');
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
    artists:{ 
        type: [ObjectId],
        requried: true
    }
}, {
    timestamps: true,
});

const Album = mongoose.model('Album', albumSchema);

module.exports = Album;
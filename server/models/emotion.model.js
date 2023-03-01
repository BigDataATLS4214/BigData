const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const emotionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }
},{
    timestamps: true
});

const Emotion = mongoose.model('Emotion', emotionSchema);

module.exports = Emotion;
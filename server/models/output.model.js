const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const outputSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
},{
    timestamps: true
});

const Output = mongoose.model('Output', outputSchema);

module.exports = Output;
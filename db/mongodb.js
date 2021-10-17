const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');

const { Schema } = mongoose

let commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Number,
        enum: [0, 1],
        default: 0
    },
    age: {
        type: Number
    }
})

module.exports = mongoose.model('Student', commentSchema)

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

<<<<<<< HEAD
module.exports = mongoose.model('Student', commentSchema)
=======
for (let i = 0; i < 100; i++) {
    let kitty = new Cat({ name: 'miao' + i })

    kitty.save(function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log('meow')
        }
    })
}
>>>>>>> a69995d9a57ae98bf37a832dceaefad81eaf23c1

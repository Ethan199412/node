const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/test')

mongoose.Promise = global.Promise
let Cat = mongoose.model('Cat', { name: String })
let kitty = new Cat({ name: 'haha' })

kitty.save(err => {
    if (err) {
        console.log(err)
    } else {
        console.log('meow')
    }
})
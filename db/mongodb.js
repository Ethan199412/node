const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
mongoose.Promise = global.Promise

let Cat = mongoose.model('Cat', { name: String });


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

const fs=require('fs')
const stream = fs.createWriteStream('./test.txt')
stream.write('123')

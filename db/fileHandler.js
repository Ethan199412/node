const fs = require('fs')
const dbPath = './db.json'
const read = function (callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            console.log(err)
            callback(err)
        }
        callback(null, JSON.parse(data).student)
    })
}

const deleteData = function (id, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            console.log('delete data in db error', err)
            callback('error')
        }
        let student = JSON.parse(data).student
        let index = student.findIndex(e => e.id === id)
        student.splice(index, 1)
        fs.writeFile(dbPath, JSON.stringify(student), function (err) {
            if(err)
                console.log('delete err',err)
            callback('delete success')
        })
        callback('delete success')

    })
}

const insert = function (dataInserted, callback) {
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            callback(err)
        }
        let student = JSON.parse(data).student
        student.push(Object.assign(dataInserted, { id: student[student.length - 1].id + 1 }))
        fs.writeFile('./db.json', JSON.stringify({ student }), function (err) {
            if (err) {
                console.log(err)
            }
            callback('insert success')
        })
    })
}


module.exports = {
    read,
    insert,
    deleteData
}
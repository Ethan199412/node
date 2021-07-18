const fs = require('fs')
const dbPath = './db.json'
const read = function (callback) {
    fs.readFile(dbPath, function (err, data) {
        console.log('[p1] data', data.toString())
        if (err) {
            console.log(err)
            callback(err)
            return
        }
        callback(null, JSON.parse(data).student)
    })
}

const deleteData = function (id, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            //console.log('delete data in db error', err)
            callback('error')
            return
        }

        let student = JSON.parse(data).student
        //console.log('[p0] student',student,data.toString())
        let index = student.findIndex(e => e.id === id)
        console.log('[p2] index', id, index)
        student.splice(index, 1)
        fs.writeFile(dbPath, JSON.stringify({ student }), function (err) {
            if (err)
                console.log('delete err', err)
            callback('delete success')
        })
    })
}

const insert = function (dataInserted, callback) {
    fs.readFile('./db.json', function (err, data) {
        if (err) {
            callback(err)
        }
        let student = JSON.parse(data).student
        id = 0
        if (student.length > 0) {
            id = student[student.length - 1].id + 1
        }
        student.push(Object.assign(dataInserted, { id }))
        fs.writeFile('./db.json', JSON.stringify({ student }), function (err) {
            if (err) {
                console.log(err)
            }
            callback('insert success')
        })
    })
}

const update = function (dataUpdated, callback) {
    fs.readFile(dbPath, function (err, data) {
        if (err) {
            callback(err)
        }
        let student = JSON.parse(data).student
        let index = student.findIndex(e => e.id === dataUpdated.id)
        student[index] = dataUpdated
        fs.writeFile(dbPath, JSON.stringify({ student }), function (err) {
            if (err) {
                console.log(err)
            }
            callback('update success')
        })
    })
}

module.exports = {
    read,
    insert,
    deleteData,
    update
}
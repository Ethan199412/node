const Modal = require('./mongodb')
const { ObjectId } = require('mongodb')
function save(obj, callback) {
    const { name, age, gender } = obj
    let record = new Modal({
        name,
        age,
        gender
    })

    record.save((err, ret) => {
        if (err) {
            callback({
                err: `保存错误${err}`,
                code: 0
            })
        } else {
            callback({
                code: 200
            })
        }
    })
}

function find(callback) {
    Modal.find((err, ret) => {
        if (err) {
            console.log('查询失败')
            callback({
                code: 0,
                err,
                data: {}
            })
        } else {
            console.log('查询成功')
            callback({
                code: 200,
                data: ret
            })
        }
    })
}

function update(_id, obj, callback) {
    Modal.findByIdAndUpdate(ObjectId(_id), obj, (err, ret) => {
        if (err) {
            console.log('更新失败')
            callback({
                code: 0,
                err
            })
        } else {
            console.log('更新成功')
            callback({
                code: 200
            })
        }
    })
}

function deleteData(_id, callback) {
    console.log('[p1] _id', _id, ObjectId(_id))
    Modal.remove({
        _id: ObjectId(_id)
    }, (err, ret) => {
        if (err) {
            console.log('删除失败')
            callback({
                err,
                code: 0
            })
        } else {
            console.log('删除成功')
            callback({
                code: 200
            })
        }
    })
}

module.exports = {
    save,
    find,
    deleteDataDb: deleteData,
    updateDb: update
}
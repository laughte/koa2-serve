require('./tools/connect_mongo');

let StuModel = require('./module/students')

let a = ""
StuModel.findOne({

}, function (err, doc) {
    if (!err) {
        a = doc.name
    }
})

console.log(a)
const mongoose = require("mongoose");


//创建一个schema(模式)对象
let Schema = mongoose.Schema;

let stuschema = new Schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        default: 'female'
    },
    address: String
});

//通过schema来创建MOdel
let StuModel = mongoose.model('students', stuschema);

module.exports = StuModel;
const mongoose = require("mongoose");

//连接数据库
mongoose.connect('mongodb://localhost/test', {
    useNewUrlParser: true
});


//断开数据库连接 (mongo数据库没有事务控制,一般不用调用disconnect())
// mongoose.disconnect();

//监听数据库连接状态
mongoose.connection.once('open', function () {
    console.log('mongo数据库已连接~~~')
}); //打开
// mongoose.connection.once('close',function(){}); //关闭
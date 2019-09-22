const Koa = require("koa"),
  Router = require('koa-router'),
  views = require('koa-views'),
  bodyParser = require('koa-bodyparser'),
  static = require('koa-static'), //静态资源中间件
  // render = require('koa-art-template'),
  // path = require('path'),
  cors = require('koa2-cors'),
  DB = require('./module/mongodb');





//连接mongodb数据库
// require('./tools/connect_mongo');

// let StuModel = require('./module/students')

// 实列化koa
const app = new Koa();
const router = new Router();


//跨域解决方案
app.use(cors());

//配置bodyparser的中间件
app.use(bodyParser());

// 配置静态资源中间件
app.use(static('static'));


// 配置ejs模板引擎中间件 --第三方中间间
app.use(views('views', {
  map: {
    html: 'ejs'
  }
}));
//这样配置也可以文件后缀名为html
// app.use(views('views', {
//   extension: 'ejs' //这种配置文件后缀名为ejs
// }));


// 配置art-template模板引擎
// render(app, {
//   root: path.join(__dirname, 'views'), //视图的位置
//   extname: '.html', //后缀名
//   debug: process.env.NODE_ENV !== 'production' //开启调试模式
// });


// 中间件配置公共数据
app.use(async (ctx, next) => {

  await next(); //继续向下匹配路由
});



// let resume = require('./routers/resumeapi')
// router.use('/', resume)



// 配置路由
router

  // login 
  .post('/login', async ctx => {
    // console.log(ctx.request.body)
    let res = await DB.insert('users', ctx.request.body);
    // ctx.body = res
    try {
      if (res.result.ok) {

        ctx.body = res.ops[0];
      }
    } catch (error) {
      console.log(error);
    }

  })
  //signin
  .post('/signin', async ctx => {
    console.log(ctx.request.body);
    let res = await DB.find('users', ctx.request.body);

    ctx.body = res

  })
  .post('/uploadImg', async ctx => {
    // let id = ctx.request.body.id;
    // let imgsrc = ctx.request.body.imgsrc;
    // let res = await DB.update('users', {
    //   _id: DB.setObjectId(id)
    // }, {
    //   imgsrc
    // }, );
    console.log(ctx)
  })

let index = require('./routers/index');
router.use('/', index)

let blog = require('./routers/blog');
router.use('/blog', blog);


let resume = require('./routers/resume');
router.use('/resume', resume)


let picture = require('./routers/picture');
router.use('/picture', picture);

//start route
app
  .use(router.routes()) //
  .use(router.allowedMethods());



app.listen(9600, () => {
  console.log(`server started on 9600!`)
});

// app.listen(3389, () => {
//   console.log(`server started on 3389!`)
// });

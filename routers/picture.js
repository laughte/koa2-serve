let router = require('koa-router')();
bodyParser = require('koa-bodyparser');
DB = require('../module/mongodb');

// picture服务端api
// picture 数据库查询 api
router
  .post('/', async ctx => {
    console.log(ctx.request.body);
    let res = await DB.find('picture', ctx.request.body, 60);

    ctx.body = res

  })

  .post('/searchArray', async ctx => {

    let res = await DB.find('picture', ctx.request.body);

    ctx.body = res

  })

  //  picture写入api
  .post('/wpicture', async ctx => {

    let res = await DB.insert('picture', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = '写入成功';
      }
    } catch (err) {
      console.log(err);
    }
  })
  // picture编辑api
  .post('/epicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    delete (data._id)

    let res = await DB.update('picture', {
      '_id': DB.setObjectId(id)
    }, data);

    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err);
    }

  })
  // picture edit for array
  .post('/arrEpicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    delete (data._id)

    let res = await DB.updateArray('picture', {
      '_id': DB.setObjectId(id)
    }, data);

    // console.log(res)
    ctx.body = res
    // try {
    //   if (res.result.ok) {
    //     ctx.body = res
    //   }
    // } catch (err) {
    //   console.log(err);
    // }

  })

  // picture删除api (是假的删除)
  .post('/fdpicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    let delflag = data.delflag;
    let res = await DB.update('picture', {
      '_id': DB.setObjectId(id)
    }, {
      delflag
    });
    try {
      if (res.result.ok) {
        ctx.body = '移除成功;'
      }
    } catch (err) {
      console.log(err)
    }

  })

  // picture删除api (是真的删除)
  .post('/dpicture', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    console.log(id)
    let res = await DB.remove('picture', {
      '_id': DB.setObjectId(id)
    });
    try {
      if (res.result.ok) {
        ctx.body = '删除成功';
      }
    } catch (error) {
      console.log(error);
    }

  })

module.exports = router.routes()

let router = require('koa-router')();
bodyParser = require('koa-bodyparser');
DB = require('../module/mongodb');

router //bolgcontent
  .post('/', async ctx => {
 
   
      let res = await DB.find('myblog', ctx.request.body);
      ctx.body = res



  })

  .post('/insert', async ctx => {
    let res = await DB.insert('myblog', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err)
    }
  })
  .post('/update', async ctx => {
    let e = ctx.request.body
    let id = e._id
    delete(e._id)
    delete(e.articleComment)
    // console.log(id, e)

    let res = await DB.update('myblog', {
      _id: DB.setObjectId(id)
    }, e);
    try {
      if (res.result.ok) {
        ctx.body = "更新成功"
      }
    } catch (err) {
      console.log(err)
    }


    // if (e.articleReply) {
    //   let articleReply = e.articleReply
    //   let res = await DB.update('myblog', {
    //     _id: DB.setObjectId(id)
    //   }, {
    //     articleReply
    //   });
    //   try {
    //     if (res.result.ok) {
    //       ctx.body = "更新成功"
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }

    // } else if (e.articleCollect) {
    //   let articleCollect = e.articleCollect;
    //   let res = await DB.update('myblog', {
    //     _id: DB.setObjectId(id)
    //   }, {
    //     articleCollect
    //   });
    //   try {
    //     if (res.result.ok) {
    //       ctx.body = "更新成功"
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }

    // } else if (e.articleLike) {
    //   let articleLike = e.articleLike;
    //   let res = await DB.update('myblog', {
    //     _id: DB.setObjectId(id)
    //   }, {
    //     articleLike
    //   });
    //   try {
    //     if (res.result.ok) {
    //       ctx.body = "更新成功"
    //     }
    //   } catch (err) {
    //     console.log(err)
    //   }

    // }

  })
  //删除blog
  .post("/delete", async ctx => {
    let id = ctx.request.body._id;
    // let artid = ctx.request.body.articleId
    // let msgres = await DB.delete('msgboard', {
    //   articleId: artid
    // })

    let res = await DB.update('myblog', {
      _id: DB.setObjectId(id)
    }, {
      delete: true
    })
    if (res.result.ok) { // && msgres.result.ok
      ctx.body = "删除成功"
    }
  })


  // msgboard
  .post('/msgSearch', async ctx => {
    let res = await DB.find('msgboard', ctx.request.body);
    ctx.body = res
  })

  .post('/msgInsert', async ctx => {
    let res = await DB.insert('msgboard', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = res
      }
    } catch (err) {
      console.log(err)
    }
  })

  .post('/msgUpdate', async ctx => {
    let id = ctx.request.body.id;
    let like = ctx.request.body.like;
    let res = await DB.update('msgboard', {
      _id: DB.setObjectId(id)
    }, {
      like
    });
    try {
      if (res.result.ok) {
        ctx.body = "更新成功"
      }
    } catch (err) {
      console.log(err)
    }
  })


  .post('/msgDel', async ctx => {
    let id = ctx.request.body._id
    let res = await DB.remove('msgboard', {
      _id: DB.setObjectId(id)
    });
    try {
      if (res.result.ok) {
        ctx.body = "删除成功";
      }
    } catch (err) {
      console.log(err)
    }
  })



module.exports = router.routes();

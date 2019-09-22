let router = require('koa-router')();
bodyParser = require('koa-bodyparser');
DB = require('../module/mongodb');


// resume api
router
  // resume 数据库查询 api
  .post('/', async ctx => {

    // ctx.header('Access-Control-Allow-Origin', "*");
    console.log(ctx.request.body);

    let res = await DB.find('resume',
      ctx.request.body
    );
    // console.log(res)
    ctx.body = res;

  })

  //  resume写入api
  .post('/write', async ctx => {

    let res = await DB.insert('resume', ctx.request.body);
    try {
      if (res.result.ok) {
        ctx.body = '写入成功';
      }
    } catch (err) {
      console.log(err);
    }

  })

  // resume编辑api
  .post('/edite', async ctx => {
    let data = ctx.request.body;
    let hash = data.hash;
    let name = data.name;
    let age = data.age;
    let sex = data.sex;
    let tel = data.tel;
    let email = data.email;
    let post = data.post;
    let workWay = data.workWay;
    let salary = data.salary;
    let workExperience = data.workExperience;
    let education = data.education;
    let evaluation = data.evaluation;
    let skill = data.skill;
    let blog = data.blog;
    let github = data.github;

    let res = await DB.update('resume', {
      hash
    }, {
      name,
      age,
      sex,
      tel,
      email,
      post,
      workWay,
      salary,
      workExperience,
      education,
      evaluation,
      skill,
      blog,
      github
    });

    try {
      if (res.result.ok) {
        ctx.body = '修改成功';
      }
    } catch (err) {
      console.log(err);
    }

  })

  // resume删除api (是假的删除)
  .post('/fadedel', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    let delflag = data.delflag;
    let res = await DB.update('resume', {
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

  // resume删除api (是真的删除)
  .post('/delete', async ctx => {
    let data = ctx.request.body;
    let id = data._id;
    console.log(id)
    let res = await DB.remove('resume', {
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

module.exports = router.routes();

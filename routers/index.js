let router = require('koa-router')();

router.get('index', async (ctx) => {

    await ctx.render('index');
  })


  .get("/", async (ctx) => {

    await ctx.render('blog');
  })

  .get("picture", async (ctx) => {

    await ctx.render('picture');
  });



module.exports = router.routes();

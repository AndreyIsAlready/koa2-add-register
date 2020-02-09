const Router = require('koa-router');
const router = new Router();

router.get('/home', async (ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.redirect('/login');
    } else {
        ctx.body = ctx.render('home');
    }
})

module.exports = router;
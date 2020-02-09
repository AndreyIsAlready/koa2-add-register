const Router = require('koa-router');
const router = new Router();

router.get('/register', async (ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.body = ctx.render('register');
    } else {
        ctx.redirect('/');
    }
})

module.exports = router;
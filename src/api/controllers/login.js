const Router = require('koa-router');
const router = new Router();

const User = require('../user');

router.get('/login', async (ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.body = ctx.render('login');
    } else {
        ctx.redirect('/home');
    }
})

router.post('/login', async (ctx, next) => {
    user = await User.login({...ctx.request.body});
    await ctx.login(user);
    await next();
    
 }, async (ctx) => {
     if (ctx.isAuthenticated()){
         ctx.body = {url: '/home'};
     } else {
         ctx.body = {massege: false};
     } 
 })

 module.exports = router;
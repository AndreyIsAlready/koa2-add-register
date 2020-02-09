const Router = require('koa-router');
const router = new Router();

const User = require('./api/user');

router.get('/', async (ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.redirect('/login');
    } else {
        ctx.body = ctx.render('home');
    }
})

router.get('/register', async (ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.body = ctx.render('register');
    } else {
        ctx.redirect('/');
    }
})

router.get('/login', async (ctx) => {
    if (!ctx.isAuthenticated()) {
        ctx.body = ctx.render('login');
    } else {
        ctx.redirect('/');
    }
})

router.post('/login', async (ctx, next) => {
   user = await User.login({...ctx.request.body});
   await ctx.login(user);
   await next();
   
}, async (ctx) => {
    if (ctx.isAuthenticated()){
        ctx.body = {url: '/'};
    } else {
        ctx.body = {massege: false};
    } 
})

router.post('/addUser', async (ctx, next) => {  
 const user = await User.addUser({...ctx.request.body});

if (!user._id) {
    ctx.body = user;
    return;
}
    await ctx.login(user);
    await next();
 
}, async (ctx) => {
    if (ctx.isAuthenticated()){
        ctx.body = {url: '/'};
    } else {
        ctx.body = {massege: false};
    } 
});

router.get('/getUser/:id', async (ctx) => {
    const result = await User.getUser({id: ctx.params.id});
    ctx.body = result;
})

router.get('/getUsers', async (ctx) => {
    const result = await User.getUsers();
    ctx.body = result;
})

module.exports = router;
const koa  = require('koa');
const app = new koa();
const fs = require('fs');
let router;

exports.init = app => app.use(async (ctx, next) => {
    if (!ctx.url.endsWith('css') && !ctx.url.endsWith('js')) {
        path = './api/controllers' + ctx.url +'.js'
            try{
            router = require(path);
            }catch{
                ctx.redirect('/login');
                router = require('./api/controllers/login');
            }
        
    }

    app.use(router.routes());
    app.use(router.allowedMethods())
    
    await next();
});

const koa  = require('koa');
const app = new koa();
const path = require('path');
const fs = require('fs');
const serve = require('koa-static');
const needFunction = require('./routerPath.js');
const register = require('../registerPage');
require('./db/index');

const handlers = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

handlers.forEach(handler => require('./middlewares/' + handler).init(app));
app.use(serve(__dirname + '/frontend/public'));
needFunction.init(app)
app.use(register);
app.listen(3000, () => {
    console.log('localhost:3000')
});
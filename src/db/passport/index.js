const passport = require('koa-passport');
const User = require('../../db/models/user');

require('./serialize');

require('./localStrategy');

module.exports = passport;

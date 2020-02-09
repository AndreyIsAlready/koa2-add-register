register = async (ctx, next) => {
    if (!ctx.isAuthenticated() && ctx.url != '/register' && ctx.url != '/login') {
        ctx.redirect('/login');
    }
    await next();
};

module.exports = register;
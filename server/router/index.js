const usuarioRouter = require('./usuario_router');
const autoRouter = require('./auto_router');
const kilometroRouter = require('./kilometro_router');
const loginRouter = require('./login_router');

module.exports = (app) => {
    app.use('/', usuarioRouter);
    app.use('/', autoRouter);
    app.use('/', kilometroRouter);
    app.use('/', loginRouter);

}
const CursosController = require('./controllers/cursos.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;


exports.routesConfig = function (app) {
    app.post('/cursos', [
        CursosController.insert
    ]);
    app.get('/cursos', [
        CursosController.list
    ]);
    app.get('/cursos/:cursoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        CursosController.getById
    ]);
    app.patch('/cursos/:cursoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        CursosController.patchById
    ]);
    app.delete('/cursos/:cursoId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CursosController.removeById
    ]);
};

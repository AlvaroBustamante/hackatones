const OrdenController = require('./controllers/orden.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;

//funcion pagar 

exports.routesConfig = function (app) {
    app.post('/ordenes', [
        OrdenController.insert
    ]);
    app.get('/ordenes', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        OrdenController.list
    ]);
    app.get('/ordenes/:ordenId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        OrdenController.getById
    ]);
    app.patch('/ordenes/:ordenId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        OrdenController.patchById
    ]);

    app.patch('/ordenes/:ordenId/pagar', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        OrdenController.pagoById
    ]);

    app.delete('/ordenes/:ordenId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdenController.removeById
    ]);
};

const CuponController = require('./controllers/cupon.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORMAL_USER;


exports.routesConfig = function (app) {
    app.post('/cupon', [
        CuponController.insert
    ]);
    app.get('/cupon', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        CuponController.list
    ]);
    app.get('/cupon/:cuponId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        CuponController.getById
    ]);
    app.patch('/cupon/:cuponId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        CuponController.patchById
    ]);

    app.delete('/cupon/:cuponId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        CuponController.removeById
    ]);
};

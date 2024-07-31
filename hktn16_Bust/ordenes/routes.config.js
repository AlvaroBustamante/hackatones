const OrdenController = require('./controllers/orden.controller');
const PermissionMiddleware = require('../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../common/middlewares/auth.validation.middleware');
const config = require('../common/config/env.config');
const CursosModel = require('../cursos/models/cursos.model');
const OrdenModel = require('./models/orden.model');

const cors = require("cors"); 
const express = require("express"); 
require("dotenv").config(); 
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); 
const app = express(); 
// Middlewares here 
app.use(express.json()); 
app.use(cors()); 

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

    app.post("/api/create-checkout-session", [
      ValidationMiddleware.validJWTNeeded,
      PermissionMiddleware.minimumPermissionLevelRequired(FREE),
      async (req, res) => {
          const { cursoId, userId, cuponId } = req.body;
          const curso = await CursosModel.findById(cursoId);
            if (!curso) {
                return res.status(404).send("Curso no encontrado");
            }
          const nuevaOrden = await OrdenModel.createOrden({
                user_id: userId,
                curso_id: cursoId,
                total_final: curso.valor,
                cupon_id: cuponId || null
            });
  
              const session = await stripe.checkout.sessions.create({
                  payment_method_types: ["card"],
                  line_items: [
                      {
                          price_data: {
                              currency: "pen",
                              product_data: {
                                  name: curso.nombre,
                              },
                              unit_amount: curso.valor * 100,
                          },
                          quantity: 1,
                      },
                  ],
                  mode: "payment",
                  success_url: `http://localhost:3000/success?orden_id=${nuevaOrden._id}`,
                  cancel_url: "http://localhost:3000/cancel",
              });
  
              res.json({ id: session.id });
          } 
  ]);
  

    app.delete('/ordenes/:ordenId', [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdenController.removeById
    ]);
};

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
});
app.use(express.json());

const AuthorizationRouter = require('./authorization/routes.config');
const UsersRouter = require('./users/routes.config');
const CursosRouter = require('./cursos/routes.config');
const OrdenRouter = require('./ordenes/routes.config');
const CuponRouter = require('./cupones/routes.config');

AuthorizationRouter.routesConfig(app);
UsersRouter.routesConfig(app);
CursosRouter.routesConfig(app);
OrdenRouter.routesConfig(app);
CuponRouter.routesConfig(app);




app.listen(PORT, function () {
    console.log('app listening at port %s', PORT);
});
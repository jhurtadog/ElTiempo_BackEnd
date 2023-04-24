import express, { json } from "express";
import createError from "http-errors";
import usuarioRoutes from "../routes/usuarioRoutes.js";
import productoRoutes from "../routes/productoRoutes.js";
import errorHandler from "../middleware/checkError.js";

const app = express();

const configuracionRouter = (app) => {
    app.use(json());
    app.use("/api/usuarios", usuarioRoutes);
    app.use("/api/productos", productoRoutes);
    app.use(function (req, res, next) {
        next(createError(404));
    });
    app.use(errorHandler);
};

configuracionRouter(app);

export default app;
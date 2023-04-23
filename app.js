import express, { json } from "express";
import cors from "cors";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import createError from "http-errors";
import errorHandler from "./middleware/checkError.js"

const app = express();

const whitelist = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Error de Cors"));
        }
    },
};

const configuracionRouter = (app) => {
    app.use(json());
    //app.use(cors(corsOptions));
    app.use("/api/usuarios", usuarioRoutes);
    app.use("/api/productos", productoRoutes);
    app.use(function (req, res, next) {
        next(createError(404));
    });
    app.use(errorHandler);
};

configuracionRouter(app);

export default app;
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import createError from "http-errors";
import errorHandler from "./middleware/checkError.js"

dotenv.config();

conectarDB();

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

const configuracionApi = (app) => {
  app.use(express.json())
  //app.use(cors(corsOptions));
};

const configuracionRouter = (app) => {
  app.use("/api/usuarios", usuarioRoutes);
  app.use("/api/productos", productoRoutes);
  app.use(function (req, res, next) {
    next(createError(404));
  });
  app.use(errorHandler);
};

const init = () => {
  const app = express()
  configuracionApi(app)
  configuracionRouter(app)
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });
};

init();
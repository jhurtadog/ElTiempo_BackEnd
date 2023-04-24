import express from "express";
const router = express.Router();
import {
  registrar,
  autenticar,
  perfil,
} from "../controllers/usuarioController.js";

import checkAuth from "../middleware/checkAuth.js";
import { autenticarValidation, registrarValidation } from '../validations/validationAuth.js'

router.post("/", registrarValidation, registrar);
router.post("/login", autenticarValidation, autenticar);
router.get("/perfil", checkAuth, perfil);

export default router;

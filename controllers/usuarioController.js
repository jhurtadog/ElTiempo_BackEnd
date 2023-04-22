import Usuario from "../models/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import errors from  "../const/errors.js"

const registrar = async (req, res) => {
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });
  if(!existeUsuario) return next(errors.usuarioRegistrar)

  try {
    const usuario = new Usuario(req.body);
    usuario.token = '';
    await usuario.save();
    res.json({
      msg: "Usuario creado correctamente...",
    });
  } catch (error) {
    return next({ code: 400, message: error.message });
  }
};

const autenticar = async (req, res, next) => {
  const { email, password } = req.body;
  const usuario = await Usuario.findOne({ email });
  if(!usuario) return next(errors.usuarioAutenticar);

  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return next({ code: 400, message: error.message });
  }
};

const perfil = async (req, res) => {
  const { usuario } = req;
  res.json(usuario);
};

export {
  registrar,
  autenticar,
  perfil,
};

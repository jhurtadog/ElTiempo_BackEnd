import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario.js";
import errors from "../const/errors.js";

const checkAuth = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.usuario = await Usuario.findById(decoded.id).select("-password -confirmado -token -createdAt -updatedAt -__v");
      return next();
    } catch (error) {
      return next({ code: 400, message: "Hubo un error"});
    }
  }

  if (!token) next(errors.authToken);
};

export default checkAuth;
